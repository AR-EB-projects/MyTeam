/* eslint-disable no-console */
const fs = require("fs");
const path = require("path");
const { randomBytes } = require("crypto");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

function parseCsv(content, delimiter) {
  const rows = [];
  let row = [];
  let field = "";
  let inQuotes = false;

  for (let i = 0; i < content.length; i += 1) {
    const ch = content[i];

    if (ch === "\"") {
      if (inQuotes && content[i + 1] === "\"") {
        field += "\"";
        i += 1;
      } else {
        inQuotes = !inQuotes;
      }
      continue;
    }

    if (ch === delimiter && !inQuotes) {
      row.push(field);
      field = "";
      continue;
    }

    if ((ch === "\n" || ch === "\r") && !inQuotes) {
      if (ch === "\r" && content[i + 1] === "\n") {
        i += 1;
      }
      row.push(field);
      rows.push(row);
      row = [];
      field = "";
      continue;
    }

    field += ch;
  }

  row.push(field);
  rows.push(row);

  return rows.filter((r) => r.some((cell) => cell.trim() !== ""));
}

function normalizeHeader(value) {
  return value.replace(/\uFEFF/g, "").trim().toLowerCase();
}

function resolveRowsAndDelimiter(content) {
  const commaRows = parseCsv(content, ",");
  const semicolonRows = parseCsv(content, ";");

  const nameCandidates = [
    "Име, фамилия",
    "име, фамилия",
    "име фамилия",
    "fullName",
    "fullname",
  ];
  const teamCandidates = ["отбор", "teamgroup", "team_group"];

  const commaHeaders = commaRows[0] || [];
  const semicolonHeaders = semicolonRows[0] || [];

  const commaName = findColumnIndex(commaHeaders, nameCandidates);
  const commaTeam = findColumnIndex(commaHeaders, teamCandidates);
  const semicolonName = findColumnIndex(semicolonHeaders, nameCandidates);
  const semicolonTeam = findColumnIndex(semicolonHeaders, teamCandidates);

  if (semicolonName >= 0 && semicolonTeam >= 0) {
    return { rows: semicolonRows, delimiter: ";" };
  }

  if (commaName >= 0 && commaTeam >= 0) {
    return { rows: commaRows, delimiter: "," };
  }

  const chosen =
    (semicolonHeaders.length > commaHeaders.length
      ? { rows: semicolonRows, delimiter: ";" }
      : { rows: commaRows, delimiter: "," });

  return chosen;
}

function decodeCandidates(buffer) {
  const candidates = [{ encoding: "utf8", text: buffer.toString("utf8") }];
  try {
    const decoded1251 = new TextDecoder("windows-1251").decode(buffer);
    candidates.push({ encoding: "windows-1251", text: decoded1251 });
  } catch {
    // Ignore if runtime doesn't support windows-1251 decoder.
  }
  return candidates;
}

function resolveParsedInput(buffer) {
  const nameCandidates = [
    "Име, фамилия",
    "име, фамилия",
    "име фамилия",
    "fullName",
    "fullname",
  ];
  const teamCandidates = ["отбор", "teamgroup", "team_group"];

  const decoded = decodeCandidates(buffer);

  for (const candidate of decoded) {
    const { rows, delimiter } = resolveRowsAndDelimiter(candidate.text);
    const headers = rows[0] || [];
    const nameIndex = findColumnIndex(headers, nameCandidates);
    const teamGroupIndex = findColumnIndex(headers, teamCandidates);
    if (nameIndex >= 0 && teamGroupIndex >= 0) {
      return {
        rows,
        delimiter,
        encoding: candidate.encoding,
        headers,
        nameIndex,
        teamGroupIndex,
      };
    }
  }

  const fallback = resolveRowsAndDelimiter(decoded[0].text);
  const headers = fallback.rows[0] || [];
  return {
    rows: fallback.rows,
    delimiter: fallback.delimiter,
    encoding: decoded[0].encoding,
    headers,
    nameIndex: findColumnIndex(headers, nameCandidates),
    teamGroupIndex: findColumnIndex(headers, teamCandidates),
  };
}

function findColumnIndex(headers, candidates) {
  const normalized = headers.map(normalizeHeader);
  for (const candidate of candidates) {
    const idx = normalized.indexOf(candidate.toLowerCase());
    if (idx >= 0) {
      return idx;
    }
  }
  return -1;
}

async function resolveClubId(inputClubId) {
  if (inputClubId) {
    const club = await prisma.club.findUnique({
      where: { id: inputClubId },
      select: { id: true },
    });
    if (!club) {
      throw new Error(`Club not found for id: ${inputClubId}`);
    }
    return inputClubId;
  }

  const clubs = await prisma.club.findMany({
    select: { id: true },
    orderBy: { createdAt: "asc" },
    take: 2,
  });

  if (clubs.length !== 1) {
    throw new Error(
      "Multiple clubs detected. Pass clubId as second argument: node scripts/import-players-from-csv.js <csvPath> <clubId>"
    );
  }

  return clubs[0].id;
}

async function createPlayerWithCard({ clubId, fullName, teamGroup }) {
  let lastError = null;

  for (let i = 0; i < 5; i += 1) {
    const cardCode = randomBytes(4).toString("hex").toUpperCase();

    try {
      await prisma.player.create({
        data: {
          clubId,
          fullName,
          status: "warning",
          teamGroup,
          cards: {
            create: {
              cardCode,
              isActive: true,
            },
          },
        },
      });
      return;
    } catch (error) {
      lastError = error;
      const code =
        error && typeof error === "object" && "code" in error
          ? String(error.code)
          : "";
      if (code !== "P2002") {
        throw error;
      }
    }
  }

  throw lastError || new Error("Failed to generate unique card code.");
}

async function main() {
  const csvArg = process.argv[2];
  const clubArg = process.argv[3];

  if (!csvArg) {
    throw new Error(
      "Usage: node scripts/import-players-from-csv.js <csvPath> [clubId]"
    );
  }

  const csvPath = path.resolve(process.cwd(), csvArg);
  if (!fs.existsSync(csvPath)) {
    throw new Error(`CSV file not found: ${csvPath}`);
  }

  const rawBuffer = fs.readFileSync(csvPath);
  const {
    rows,
    delimiter,
    encoding,
    headers,
    nameIndex,
    teamGroupIndex,
  } = resolveParsedInput(rawBuffer);
  if (rows.length < 2) {
    throw new Error("CSV has no data rows.");
  }

  if (nameIndex < 0) {
    throw new Error(
      `Missing column: "Име, фамилия". Parsed encoding: "${encoding}", delimiter: "${delimiter}". Parsed headers: ${headers.join(" | ")}`
    );
  }

  if (teamGroupIndex < 0) {
    throw new Error(
      `Missing column: "отбор". Parsed encoding: "${encoding}", delimiter: "${delimiter}". Parsed headers: ${headers.join(" | ")}`
    );
  }

  const clubId = await resolveClubId(clubArg);

  let created = 0;
  let skipped = 0;
  let failed = 0;

  for (let i = 1; i < rows.length; i += 1) {
    const row = rows[i];
    const fullName = String(row[nameIndex] || "").trim();
    const teamRaw = String(row[teamGroupIndex] || "").trim();

    if (!fullName) {
      skipped += 1;
      continue;
    }

    let teamGroup = null;
    if (teamRaw) {
      const parsed = Number.parseInt(teamRaw, 10);
      if (Number.isNaN(parsed)) {
        console.warn(`Row ${i + 1}: invalid team group "${teamRaw}", skipped.`);
        failed += 1;
        continue;
      }
      teamGroup = parsed;
    }

    try {
      await createPlayerWithCard({
        clubId,
        fullName,
        teamGroup,
      });
      created += 1;
    } catch (error) {
      failed += 1;
      console.error(`Row ${i + 1}: failed to import "${fullName}".`, error);
    }
  }

  console.log(
    `Import completed. Created: ${created}, Skipped: ${skipped}, Failed: ${failed}`
  );
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
