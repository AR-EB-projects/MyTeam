
Object.defineProperty(exports, "__esModule", { value: true });

const {
  PrismaClientKnownRequestError,
  PrismaClientUnknownRequestError,
  PrismaClientRustPanicError,
  PrismaClientInitializationError,
  PrismaClientValidationError,
  NotFoundError,
  getPrismaClient,
  sqltag,
  empty,
  join,
  raw,
  Decimal,
  Debug,
  objectEnumValues,
  makeStrictEnum,
  Extensions,
  warnOnce,
  defineDmmfProperty,
  Public,
  detectRuntime,
} = require('./runtime/library.js')


const Prisma = {}

exports.Prisma = Prisma
exports.$Enums = {}

/**
 * Prisma Client JS version: 5.10.2
 * Query Engine version: 5a9203d0590c951969e85a7d07215503f4672eb9
 */
Prisma.prismaVersion = {
  client: "5.10.2",
  engine: "5a9203d0590c951969e85a7d07215503f4672eb9"
}

Prisma.PrismaClientKnownRequestError = PrismaClientKnownRequestError;
Prisma.PrismaClientUnknownRequestError = PrismaClientUnknownRequestError
Prisma.PrismaClientRustPanicError = PrismaClientRustPanicError
Prisma.PrismaClientInitializationError = PrismaClientInitializationError
Prisma.PrismaClientValidationError = PrismaClientValidationError
Prisma.NotFoundError = NotFoundError
Prisma.Decimal = Decimal

/**
 * Re-export of sql-template-tag
 */
Prisma.sql = sqltag
Prisma.empty = empty
Prisma.join = join
Prisma.raw = raw
Prisma.validator = Public.validator

/**
* Extensions
*/
Prisma.getExtensionContext = Extensions.getExtensionContext
Prisma.defineExtension = Extensions.defineExtension

/**
 * Shorthand utilities for JSON filtering
 */
Prisma.DbNull = objectEnumValues.instances.DbNull
Prisma.JsonNull = objectEnumValues.instances.JsonNull
Prisma.AnyNull = objectEnumValues.instances.AnyNull

Prisma.NullTypes = {
  DbNull: objectEnumValues.classes.DbNull,
  JsonNull: objectEnumValues.classes.JsonNull,
  AnyNull: objectEnumValues.classes.AnyNull
}


  const path = require('path')

/**
 * Enums
 */
exports.Prisma.TransactionIsolationLevel = makeStrictEnum({
  ReadUncommitted: 'ReadUncommitted',
  ReadCommitted: 'ReadCommitted',
  RepeatableRead: 'RepeatableRead',
  Serializable: 'Serializable'
});

exports.Prisma.ClubScalarFieldEnum = {
  id: 'id',
  name: 'name',
  createdAt: 'createdAt',
  emblemUrl: 'emblemUrl',
  imagePublicId: 'imagePublicId',
  imageUrl: 'imageUrl',
  reminderDay: 'reminderDay',
  overdueDay: 'overdueDay',
  reminderHour: 'reminderHour',
  reminderTz: 'reminderTz',
  trainingWeekdays: 'trainingWeekdays',
  trainingWindowDays: 'trainingWindowDays',
  trainingDates: 'trainingDates',
  reminderMinute: 'reminderMinute',
  overdueHour: 'overdueHour',
  overdueMinute: 'overdueMinute',
  sports: 'sports',
  trainingTime: 'trainingTime',
  trainingDateTimes: 'trainingDateTimes',
  secondReminderDay: 'secondReminderDay',
  secondReminderHour: 'secondReminderHour',
  secondReminderMinute: 'secondReminderMinute',
  notifyOnCoachVisit: 'notifyOnCoachVisit',
  trainingGroupMode: 'trainingGroupMode'
};

exports.Prisma.AdminPushSubscriptionScalarFieldEnum = {
  id: 'id',
  clubId: 'clubId',
  endpoint: 'endpoint',
  p256dh: 'p256dh',
  auth: 'auth',
  userAgent: 'userAgent',
  device: 'device',
  isActive: 'isActive',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  coach_group_id: 'coach_group_id'
};

exports.Prisma.ClubTrainingGroupScheduleScalarFieldEnum = {
  id: 'id',
  clubId: 'clubId',
  teamGroup: 'teamGroup',
  trainingWeekdays: 'trainingWeekdays',
  trainingDates: 'trainingDates',
  trainingWindowDays: 'trainingWindowDays',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  trainingTime: 'trainingTime',
  trainingDateTimes: 'trainingDateTimes'
};

exports.Prisma.ClubTrainingScheduleGroupScalarFieldEnum = {
  id: 'id',
  clubId: 'clubId',
  name: 'name',
  teamGroups: 'teamGroups',
  trainingWeekdays: 'trainingWeekdays',
  trainingDates: 'trainingDates',
  trainingWindowDays: 'trainingWindowDays',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  trainingTime: 'trainingTime',
  trainingDateTimes: 'trainingDateTimes'
};

exports.Prisma.ClubCustomTrainingGroupScalarFieldEnum = {
  id: 'id',
  clubId: 'clubId',
  name: 'name',
  trainingWeekdays: 'trainingWeekdays',
  trainingDates: 'trainingDates',
  trainingTime: 'trainingTime',
  trainingDateTimes: 'trainingDateTimes',
  trainingWindowDays: 'trainingWindowDays',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.UserScalarFieldEnum = {
  id: 'id',
  password: 'password',
  roles: 'roles',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.PlayerScalarFieldEnum = {
  id: 'id',
  clubId: 'clubId',
  fullName: 'fullName',
  status: 'status',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  jerseyNumber: 'jerseyNumber',
  birthDate: 'birthDate',
  teamGroup: 'teamGroup',
  lastPaymentDate: 'lastPaymentDate',
  isActive: 'isActive',
  coach_group_id: 'coach_group_id'
};

exports.Prisma.ClubCustomTrainingGroupPlayerScalarFieldEnum = {
  groupId: 'groupId',
  playerId: 'playerId',
  createdAt: 'createdAt'
};

exports.Prisma.TrainingOptOutScalarFieldEnum = {
  id: 'id',
  playerId: 'playerId',
  trainingDate: 'trainingDate',
  createdAt: 'createdAt',
  reasonCode: 'reasonCode',
  reasonText: 'reasonText'
};

exports.Prisma.TrainingNoteScalarFieldEnum = {
  id: 'id',
  clubId: 'clubId',
  trainingDate: 'trainingDate',
  note: 'note',
  createdByUserId: 'createdByUserId',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.ImageScalarFieldEnum = {
  id: 'id',
  playerId: 'playerId',
  imageUrl: 'imageUrl',
  isAdminView: 'isAdminView'
};

exports.Prisma.PaymentLogScalarFieldEnum = {
  id: 'id',
  playerId: 'playerId',
  paidAt: 'paidAt',
  recordedBy: 'recordedBy',
  paidFor: 'paidFor'
};

exports.Prisma.PaymentWaiverScalarFieldEnum = {
  id: 'id',
  playerId: 'playerId',
  waivedFor: 'waivedFor',
  reason: 'reason',
  createdBy: 'createdBy',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.PushSubscriptionScalarFieldEnum = {
  id: 'id',
  playerId: 'playerId',
  endpoint: 'endpoint',
  p256dh: 'p256dh',
  auth: 'auth',
  userAgent: 'userAgent',
  device: 'device',
  isActive: 'isActive',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.PlayerNotificationScalarFieldEnum = {
  id: 'id',
  playerId: 'playerId',
  type: 'type',
  title: 'title',
  body: 'body',
  url: 'url',
  sentAt: 'sentAt',
  readAt: 'readAt'
};

exports.Prisma.AdminNotificationScalarFieldEnum = {
  id: 'id',
  clubId: 'clubId',
  playerId: 'playerId',
  type: 'type',
  title: 'title',
  body: 'body',
  url: 'url',
  sentAt: 'sentAt',
  readAt: 'readAt'
};

exports.Prisma.CardScalarFieldEnum = {
  id: 'id',
  cardCode: 'cardCode',
  playerId: 'playerId',
  isActive: 'isActive',
  createdAt: 'createdAt'
};

exports.Prisma.CronJobRunScalarFieldEnum = {
  id: 'id',
  jobName: 'jobName',
  runYear: 'runYear',
  runMonth: 'runMonth',
  completedAt: 'completedAt',
  createdAt: 'createdAt',
  failedAt: 'failedAt',
  errorMessage: 'errorMessage'
};

exports.Prisma.PartnerDiscountUsageScalarFieldEnum = {
  id: 'id',
  playerId: 'playerId',
  partner: 'partner',
  action: 'action',
  date: 'date',
  createdAt: 'createdAt'
};

exports.Prisma.PageClickScalarFieldEnum = {
  id: 'id',
  clickedAt: 'clickedAt',
  action: 'action'
};

exports.Prisma.PartnerDiscountScalarFieldEnum = {
  id: 'id',
  name: 'name',
  logoUrl: 'logoUrl',
  badgeText: 'badgeText',
  description: 'description',
  code: 'code',
  validUntil: 'validUntil',
  storeUrl: 'storeUrl',
  terms: 'terms',
  themeColor: 'themeColor',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.TeamDiscountConfigScalarFieldEnum = {
  id: 'id',
  clubId: 'clubId',
  teamGroup: 'teamGroup',
  discountId: 'discountId',
  order: 'order',
  isVisible: 'isVisible'
};

exports.Prisma.Coach_groupsScalarFieldEnum = {
  id: 'id',
  club_id: 'club_id',
  name: 'name',
  created_at: 'created_at',
  updated_at: 'updated_at'
};

exports.Prisma.SortOrder = {
  asc: 'asc',
  desc: 'desc'
};

exports.Prisma.NullableJsonNullValueInput = {
  DbNull: Prisma.DbNull,
  JsonNull: Prisma.JsonNull
};

exports.Prisma.QueryMode = {
  default: 'default',
  insensitive: 'insensitive'
};

exports.Prisma.JsonNullValueFilter = {
  DbNull: Prisma.DbNull,
  JsonNull: Prisma.JsonNull,
  AnyNull: Prisma.AnyNull
};

exports.Prisma.NullsOrder = {
  first: 'first',
  last: 'last'
};
exports.UserRole = exports.$Enums.UserRole = {
  admin: 'admin',
  coach: 'coach'
};

exports.PlayerStatus = exports.$Enums.PlayerStatus = {
  paid: 'paid',
  warning: 'warning',
  overdue: 'overdue'
};

exports.Prisma.ModelName = {
  Club: 'Club',
  AdminPushSubscription: 'AdminPushSubscription',
  ClubTrainingGroupSchedule: 'ClubTrainingGroupSchedule',
  ClubTrainingScheduleGroup: 'ClubTrainingScheduleGroup',
  ClubCustomTrainingGroup: 'ClubCustomTrainingGroup',
  User: 'User',
  Player: 'Player',
  ClubCustomTrainingGroupPlayer: 'ClubCustomTrainingGroupPlayer',
  TrainingOptOut: 'TrainingOptOut',
  TrainingNote: 'TrainingNote',
  Image: 'Image',
  PaymentLog: 'PaymentLog',
  PaymentWaiver: 'PaymentWaiver',
  PushSubscription: 'PushSubscription',
  PlayerNotification: 'PlayerNotification',
  AdminNotification: 'AdminNotification',
  Card: 'Card',
  CronJobRun: 'CronJobRun',
  PartnerDiscountUsage: 'PartnerDiscountUsage',
  PageClick: 'PageClick',
  PartnerDiscount: 'PartnerDiscount',
  TeamDiscountConfig: 'TeamDiscountConfig',
  coach_groups: 'coach_groups'
};
/**
 * Create the Client
 */
const config = {
  "generator": {
    "name": "client",
    "provider": {
      "fromEnvVar": null,
      "value": "prisma-client-js"
    },
    "output": {
      "value": "D:\\Documents\\GitHub\\MyTeam\\src\\generated\\prisma-client",
      "fromEnvVar": null
    },
    "config": {
      "engineType": "library"
    },
    "binaryTargets": [
      {
        "fromEnvVar": null,
        "value": "windows",
        "native": true
      }
    ],
    "previewFeatures": [],
    "isCustomOutput": true
  },
  "relativeEnvPaths": {
    "rootEnvPath": null,
    "schemaEnvPath": "../../../.env"
  },
  "relativePath": "../../../prisma",
  "clientVersion": "5.10.2",
  "engineVersion": "5a9203d0590c951969e85a7d07215503f4672eb9",
  "datasourceNames": [
    "db"
  ],
  "activeProvider": "postgresql",
  "postinstall": false,
  "inlineDatasources": {
    "db": {
      "url": {
        "fromEnvVar": "DATABASE_URL",
        "value": null
      }
    }
  },
  "inlineSchema": "generator client {\n  provider = \"prisma-client-js\"\n  output   = \"../src/generated/prisma-client\"\n}\n\ndatasource db {\n  provider = \"postgresql\"\n  url      = env(\"DATABASE_URL\")\n}\n\nmodel Club {\n  id                     String                      @id @default(dbgenerated(\"gen_random_uuid()\")) @db.Uuid\n  name                   String\n  createdAt              DateTime                    @default(now()) @map(\"created_at\") @db.Timestamptz(6)\n  emblemUrl              String?                     @map(\"emblem_url\")\n  imagePublicId          String?                     @map(\"image_public_id\")\n  imageUrl               String?                     @map(\"image_url\")\n  reminderDay            Int                         @default(25) @map(\"reminder_day\")\n  overdueDay             Int                         @default(1) @map(\"overdue_day\")\n  reminderHour           Int                         @default(10) @map(\"reminder_hour\")\n  reminderTz             String                      @default(\"Europe/Sofia\") @map(\"reminder_tz\")\n  trainingWeekdays       Int[]                       @default([]) @map(\"training_weekdays\")\n  trainingWindowDays     Int                         @default(30) @map(\"training_window_days\")\n  trainingDates          String[]                    @default([]) @map(\"training_dates\")\n  reminderMinute         Int                         @default(0) @map(\"reminder_minute\")\n  overdueHour            Int                         @default(10) @map(\"overdue_hour\")\n  overdueMinute          Int                         @default(0) @map(\"overdue_minute\")\n  sports                 String?\n  trainingTime           String?                     @map(\"training_time\")\n  trainingDateTimes      Json?                       @map(\"training_date_times\")\n  secondReminderDay      Int?                        @map(\"second_reminder_day\")\n  secondReminderHour     Int?                        @map(\"second_reminder_hour\")\n  secondReminderMinute   Int?                        @map(\"second_reminder_minute\")\n  notifyOnCoachVisit     Boolean                     @default(false) @map(\"notify_on_coach_visit\")\n  trainingGroupMode      String                      @default(\"team_group\") @map(\"training_group_mode\")\n  adminNotifications     AdminNotification[]\n  adminPushSubscriptions AdminPushSubscription[]\n  customTrainingGroups   ClubCustomTrainingGroup[]\n  trainingGroupSchedules ClubTrainingGroupSchedule[]\n  trainingScheduleGroups ClubTrainingScheduleGroup[]\n  coach_groups           coach_groups[]\n  players                Player[]\n  discountConfigs        TeamDiscountConfig[]\n  trainingNotes          TrainingNote[]\n\n  @@map(\"clubs\")\n}\n\nmodel AdminPushSubscription {\n  id             String        @id @default(uuid())\n  clubId         String        @map(\"club_id\") @db.Uuid\n  endpoint       String\n  p256dh         String\n  auth           String\n  userAgent      String?       @map(\"user_agent\")\n  device         String?\n  isActive       Boolean       @default(true) @map(\"is_active\")\n  createdAt      DateTime      @default(now()) @map(\"created_at\") @db.Timestamptz(6)\n  updatedAt      DateTime      @updatedAt @map(\"updated_at\") @db.Timestamptz(6)\n  coach_group_id String?       @db.Uuid\n  club           Club          @relation(fields: [clubId], references: [id], onDelete: Cascade)\n  coach_groups   coach_groups? @relation(fields: [coach_group_id], references: [id])\n\n  @@unique([clubId, endpoint])\n  @@index([clubId, isActive])\n  @@index([clubId, coach_group_id, isActive])\n  @@map(\"admin_push_subscriptions\")\n}\n\nmodel ClubTrainingGroupSchedule {\n  id                 String   @id @default(dbgenerated(\"gen_random_uuid()\")) @db.Uuid\n  clubId             String   @map(\"club_id\") @db.Uuid\n  teamGroup          Int      @map(\"team_group\")\n  trainingWeekdays   Int[]    @default([]) @map(\"training_weekdays\")\n  trainingDates      String[] @default([]) @map(\"training_dates\")\n  trainingWindowDays Int      @default(30) @map(\"training_window_days\")\n  createdAt          DateTime @default(now()) @map(\"created_at\") @db.Timestamptz(6)\n  updatedAt          DateTime @default(now()) @updatedAt @map(\"updated_at\") @db.Timestamptz(6)\n  trainingTime       String?  @map(\"training_time\")\n  trainingDateTimes  Json?    @map(\"training_date_times\")\n  club               Club     @relation(fields: [clubId], references: [id], onDelete: Cascade)\n\n  @@unique([clubId, teamGroup])\n  @@index([clubId])\n  @@map(\"club_training_group_schedules\")\n}\n\nmodel ClubTrainingScheduleGroup {\n  id                 String   @id @default(dbgenerated(\"gen_random_uuid()\")) @db.Uuid\n  clubId             String   @map(\"club_id\") @db.Uuid\n  name               String\n  teamGroups         Int[]    @default([]) @map(\"team_groups\")\n  trainingWeekdays   Int[]    @default([]) @map(\"training_weekdays\")\n  trainingDates      String[] @default([]) @map(\"training_dates\")\n  trainingWindowDays Int      @default(30) @map(\"training_window_days\")\n  createdAt          DateTime @default(now()) @map(\"created_at\") @db.Timestamptz(6)\n  updatedAt          DateTime @default(now()) @updatedAt @map(\"updated_at\") @db.Timestamptz(6)\n  trainingTime       String?  @map(\"training_time\")\n  trainingDateTimes  Json?    @map(\"training_date_times\")\n  club               Club     @relation(fields: [clubId], references: [id], onDelete: Cascade)\n\n  @@index([clubId])\n  @@map(\"club_training_schedule_groups\")\n}\n\nmodel ClubCustomTrainingGroup {\n  id                 String                          @id @default(dbgenerated(\"gen_random_uuid()\")) @db.Uuid\n  clubId             String                          @map(\"club_id\") @db.Uuid\n  name               String\n  trainingWeekdays   Int[]                           @default([]) @map(\"training_weekdays\")\n  trainingDates      String[]                        @default([]) @map(\"training_dates\")\n  trainingTime       String?                         @map(\"training_time\")\n  trainingDateTimes  Json?                           @map(\"training_date_times\")\n  trainingWindowDays Int                             @default(30) @map(\"training_window_days\")\n  createdAt          DateTime                        @default(now()) @map(\"created_at\") @db.Timestamptz(6)\n  updatedAt          DateTime                        @default(now()) @updatedAt @map(\"updated_at\") @db.Timestamptz(6)\n  players            ClubCustomTrainingGroupPlayer[]\n  club               Club                            @relation(fields: [clubId], references: [id], onDelete: Cascade)\n\n  @@index([clubId])\n  @@map(\"club_custom_training_groups\")\n}\n\nmodel User {\n  id        String     @id @default(dbgenerated(\"gen_random_uuid()\")) @db.Uuid\n  password  String\n  roles     UserRole[]\n  createdAt DateTime   @default(now()) @map(\"created_at\") @db.Timestamptz(6)\n  updatedAt DateTime   @default(now()) @map(\"updated_at\") @db.Timestamptz(6)\n\n  @@map(\"users\")\n}\n\nmodel Player {\n  id                   String                         @id @default(dbgenerated(\"gen_random_uuid()\")) @db.Uuid\n  clubId               String                         @map(\"club_id\") @db.Uuid\n  fullName             String                         @map(\"full_name\")\n  status               PlayerStatus                   @default(paid)\n  createdAt            DateTime                       @default(now()) @map(\"created_at\") @db.Timestamptz(6)\n  updatedAt            DateTime                       @default(now()) @map(\"updated_at\") @db.Timestamptz(6)\n  jerseyNumber         String?                        @map(\"jersey_number\")\n  birthDate            DateTime?                      @map(\"birth_date\") @db.Date\n  teamGroup            Int?                           @map(\"team_group\")\n  lastPaymentDate      DateTime?                      @map(\"last_payment_date\") @db.Timestamptz(6)\n  isActive             Boolean                        @default(true) @map(\"is_active\")\n  coach_group_id       String?                        @db.Uuid\n  adminNotifications   AdminNotification[]\n  cards                Card[]\n  customTrainingGroups ClubCustomTrainingGroupPlayer?\n  images               Image[]\n  discountUsages       PartnerDiscountUsage[]\n  paymentLogs          PaymentLog[]\n  paymentWaivers       PaymentWaiver[]\n  playerNotification   PlayerNotification[]\n  club                 Club                           @relation(fields: [clubId], references: [id], onDelete: Cascade)\n  coach_groups         coach_groups?                  @relation(fields: [coach_group_id], references: [id])\n  pushSubscriptions    PushSubscription[]\n  trainingOptOuts      TrainingOptOut[]\n\n  @@index([clubId])\n  @@map(\"players\")\n}\n\nmodel ClubCustomTrainingGroupPlayer {\n  groupId   String                  @map(\"group_id\") @db.Uuid\n  playerId  String                  @unique @map(\"player_id\") @db.Uuid\n  createdAt DateTime                @default(now()) @map(\"created_at\") @db.Timestamptz(6)\n  group     ClubCustomTrainingGroup @relation(fields: [groupId], references: [id], onDelete: Cascade)\n  player    Player                  @relation(fields: [playerId], references: [id], onDelete: Cascade)\n\n  @@id([groupId, playerId])\n  @@index([groupId])\n  @@map(\"club_custom_training_group_players\")\n}\n\nmodel TrainingOptOut {\n  id           String   @id @default(dbgenerated(\"gen_random_uuid()\")) @db.Uuid\n  playerId     String   @map(\"player_id\") @db.Uuid\n  trainingDate DateTime @map(\"training_date\") @db.Date\n  createdAt    DateTime @default(now()) @map(\"created_at\") @db.Timestamptz(6)\n  reasonCode   String?  @map(\"reason_code\")\n  reasonText   String?  @map(\"reason_text\")\n  player       Player   @relation(fields: [playerId], references: [id], onDelete: Cascade)\n\n  @@unique([playerId, trainingDate])\n  @@index([trainingDate])\n  @@map(\"training_opt_outs\")\n}\n\nmodel TrainingNote {\n  id              String   @id @default(dbgenerated(\"gen_random_uuid()\")) @db.Uuid\n  clubId          String   @map(\"club_id\") @db.Uuid\n  trainingDate    DateTime @map(\"training_date\") @db.Date\n  note            String?\n  createdByUserId String?  @map(\"created_by_user_id\")\n  createdAt       DateTime @default(now()) @map(\"created_at\") @db.Timestamptz(6)\n  updatedAt       DateTime @default(now()) @map(\"updated_at\") @db.Timestamptz(6)\n  club            Club     @relation(fields: [clubId], references: [id], onDelete: Cascade)\n\n  @@unique([clubId, trainingDate])\n  @@index([trainingDate])\n  @@map(\"training_notes\")\n}\n\nmodel Image {\n  id          String  @id @default(dbgenerated(\"gen_random_uuid()\")) @db.Uuid\n  playerId    String  @map(\"player_id\") @db.Uuid\n  imageUrl    String  @map(\"image_url\")\n  isAdminView Boolean @map(\"is_admin_view\")\n  player      Player  @relation(fields: [playerId], references: [id], onDelete: Cascade)\n\n  @@index([playerId])\n  @@map(\"images\")\n}\n\nmodel PaymentLog {\n  id         String   @id @default(dbgenerated(\"gen_random_uuid()\")) @db.Uuid\n  playerId   String   @map(\"player_id\") @db.Uuid\n  paidAt     DateTime @default(now()) @map(\"paid_at\") @db.Timestamptz(6)\n  recordedBy String   @default(\"admin\") @map(\"recorded_by\")\n  paidFor    DateTime @map(\"paid_for\") @db.Timestamptz(6)\n  player     Player   @relation(fields: [playerId], references: [id], onDelete: Cascade)\n\n  @@index([playerId])\n  @@map(\"payment_logs\")\n}\n\nmodel PaymentWaiver {\n  id        String   @id @default(dbgenerated(\"gen_random_uuid()\")) @db.Uuid\n  playerId  String   @map(\"player_id\") @db.Uuid\n  waivedFor DateTime @map(\"waived_for\") @db.Timestamptz(6)\n  reason    String?\n  createdBy String   @default(\"admin\") @map(\"created_by\")\n  createdAt DateTime @default(now()) @map(\"created_at\") @db.Timestamptz(6)\n  updatedAt DateTime @default(now()) @map(\"updated_at\") @db.Timestamptz(6)\n  player    Player   @relation(fields: [playerId], references: [id], onDelete: Cascade)\n\n  @@unique([playerId, waivedFor])\n  @@index([playerId])\n  @@map(\"payment_waivers\")\n}\n\nmodel PushSubscription {\n  id        String   @id @default(uuid())\n  playerId  String   @db.Uuid\n  endpoint  String   @unique\n  p256dh    String\n  auth      String\n  userAgent String?\n  device    String?\n  isActive  Boolean  @default(true)\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n  member    Player   @relation(fields: [playerId], references: [id], onDelete: Cascade)\n\n  @@index([playerId, isActive])\n  @@map(\"push_subscriptions\")\n}\n\nmodel PlayerNotification {\n  id       String    @id @default(uuid())\n  playerId String    @db.Uuid\n  type     String\n  title    String\n  body     String\n  url      String?\n  sentAt   DateTime  @default(now())\n  readAt   DateTime?\n  player   Player    @relation(fields: [playerId], references: [id], onDelete: Cascade)\n\n  @@index([playerId, sentAt])\n  @@index([playerId, readAt])\n  @@map(\"player_notifications\")\n}\n\nmodel AdminNotification {\n  id       String    @id @default(uuid())\n  clubId   String    @map(\"club_id\") @db.Uuid\n  playerId String?   @map(\"player_id\") @db.Uuid\n  type     String\n  title    String\n  body     String\n  url      String?\n  sentAt   DateTime  @default(now()) @map(\"sent_at\")\n  readAt   DateTime? @map(\"read_at\")\n  club     Club      @relation(fields: [clubId], references: [id], onDelete: Cascade)\n  player   Player?   @relation(fields: [playerId], references: [id])\n\n  @@index([clubId, sentAt])\n  @@index([clubId, readAt])\n  @@index([clubId, playerId])\n  @@map(\"admin_notifications\")\n}\n\nmodel Card {\n  id        String   @id @default(uuid())\n  cardCode  String   @unique\n  playerId  String   @db.Uuid\n  isActive  Boolean  @default(true)\n  createdAt DateTime @default(now())\n  player    Player   @relation(fields: [playerId], references: [id])\n\n  @@map(\"cards\")\n}\n\nmodel CronJobRun {\n  id           BigInt    @id @default(autoincrement())\n  jobName      String    @map(\"job_name\")\n  runYear      Int       @map(\"run_year\")\n  runMonth     Int       @map(\"run_month\")\n  completedAt  DateTime? @map(\"completed_at\") @db.Timestamptz(6)\n  createdAt    DateTime  @default(now()) @map(\"created_at\") @db.Timestamptz(6)\n  failedAt     DateTime? @map(\"failed_at\") @db.Timestamptz(6)\n  errorMessage String?   @map(\"error_message\")\n\n  @@unique([jobName, runYear, runMonth])\n  @@map(\"cron_job_runs\")\n}\n\nmodel PartnerDiscountUsage {\n  id        String   @id @default(uuid()) @db.Uuid\n  playerId  String   @map(\"player_id\") @db.Uuid\n  partner   String\n  action    String\n  date      DateTime @db.Date\n  createdAt DateTime @default(now()) @map(\"created_at\") @db.Timestamptz(6)\n  player    Player   @relation(fields: [playerId], references: [id], onDelete: Cascade)\n\n  @@index([playerId])\n  @@index([date])\n  @@index([partner, date])\n  @@map(\"partner_discount_usage\")\n}\n\nmodel PageClick {\n  id        String   @id @default(dbgenerated(\"gen_random_uuid()\")) @db.Uuid\n  clickedAt DateTime @default(now()) @map(\"clicked_at\") @db.Timestamptz(6)\n  action    String   @default(\"unknown\")\n\n  @@index([clickedAt])\n  @@index([action])\n  @@map(\"page_clicks\")\n}\n\nmodel PartnerDiscount {\n  id          String               @id @default(uuid()) @db.Uuid\n  name        String\n  logoUrl     String?              @map(\"logo_url\")\n  badgeText   String?              @map(\"badge_text\")\n  description String?\n  code        String?\n  validUntil  DateTime?            @map(\"valid_until\") @db.Timestamptz(6)\n  storeUrl    String?              @map(\"store_url\")\n  terms       String[]\n  themeColor  String?              @map(\"theme_color\")\n  createdAt   DateTime             @default(now()) @map(\"created_at\") @db.Timestamptz(6)\n  updatedAt   DateTime             @default(now()) @updatedAt @map(\"updated_at\") @db.Timestamptz(6)\n  teamConfigs TeamDiscountConfig[]\n\n  @@map(\"partner_discounts\")\n}\n\nmodel TeamDiscountConfig {\n  id         String          @id @default(uuid()) @db.Uuid\n  clubId     String          @map(\"club_id\") @db.Uuid\n  teamGroup  Int             @map(\"team_group\")\n  discountId String          @map(\"discount_id\") @db.Uuid\n  order      Int             @default(0)\n  isVisible  Boolean         @default(true) @map(\"is_visible\")\n  club       Club            @relation(fields: [clubId], references: [id], onDelete: Cascade)\n  discount   PartnerDiscount @relation(fields: [discountId], references: [id], onDelete: Cascade)\n\n  @@unique([clubId, teamGroup, discountId])\n  @@map(\"team_discount_configs\")\n}\n\nmodel coach_groups {\n  id                       String                  @id @default(dbgenerated(\"gen_random_uuid()\")) @db.Uuid\n  club_id                  String                  @db.Uuid\n  name                     String\n  created_at               DateTime                @default(now()) @db.Timestamptz(6)\n  updated_at               DateTime                @default(now()) @db.Timestamptz(6)\n  admin_push_subscriptions AdminPushSubscription[]\n  clubs                    Club                    @relation(fields: [club_id], references: [id], onDelete: Cascade)\n  players                  Player[]\n\n  @@index([club_id])\n}\n\nenum PlayerStatus {\n  paid\n  warning\n  overdue\n\n  @@map(\"player_status\")\n}\n\nenum UserRole {\n  admin\n  coach\n}\n",
  "inlineSchemaHash": "802ce1c845ebfc5d07332c2918ea211a02084018ee0dadf7a99318a783410b16",
  "copyEngine": true
}

const fs = require('fs')

config.dirname = __dirname
if (!fs.existsSync(path.join(__dirname, 'schema.prisma'))) {
  const alternativePaths = [
    "src/generated/prisma-client",
    "generated/prisma-client",
  ]
  
  const alternativePath = alternativePaths.find((altPath) => {
    return fs.existsSync(path.join(process.cwd(), altPath, 'schema.prisma'))
  }) ?? alternativePaths[0]

  config.dirname = path.join(process.cwd(), alternativePath)
  config.isBundled = true
}

config.runtimeDataModel = JSON.parse("{\"models\":{\"Club\":{\"dbName\":\"clubs\",\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"default\":{\"name\":\"dbgenerated\",\"args\":[\"gen_random_uuid()\"]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"name\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"createdAt\",\"dbName\":\"created_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"emblemUrl\",\"dbName\":\"emblem_url\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"imagePublicId\",\"dbName\":\"image_public_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"imageUrl\",\"dbName\":\"image_url\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"reminderDay\",\"dbName\":\"reminder_day\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"default\":25,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"overdueDay\",\"dbName\":\"overdue_day\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"default\":1,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"reminderHour\",\"dbName\":\"reminder_hour\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"default\":10,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"reminderTz\",\"dbName\":\"reminder_tz\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"default\":\"Europe/Sofia\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"trainingWeekdays\",\"dbName\":\"training_weekdays\",\"kind\":\"scalar\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"default\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"trainingWindowDays\",\"dbName\":\"training_window_days\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"default\":30,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"trainingDates\",\"dbName\":\"training_dates\",\"kind\":\"scalar\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"default\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"reminderMinute\",\"dbName\":\"reminder_minute\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"default\":0,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"overdueHour\",\"dbName\":\"overdue_hour\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"default\":10,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"overdueMinute\",\"dbName\":\"overdue_minute\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"default\":0,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"sports\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"trainingTime\",\"dbName\":\"training_time\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"trainingDateTimes\",\"dbName\":\"training_date_times\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Json\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"secondReminderDay\",\"dbName\":\"second_reminder_day\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Int\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"secondReminderHour\",\"dbName\":\"second_reminder_hour\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Int\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"secondReminderMinute\",\"dbName\":\"second_reminder_minute\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Int\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"notifyOnCoachVisit\",\"dbName\":\"notify_on_coach_visit\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Boolean\",\"default\":false,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"trainingGroupMode\",\"dbName\":\"training_group_mode\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"default\":\"team_group\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"adminNotifications\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"AdminNotification\",\"relationName\":\"AdminNotificationToClub\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"adminPushSubscriptions\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"AdminPushSubscription\",\"relationName\":\"AdminPushSubscriptionToClub\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"customTrainingGroups\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"ClubCustomTrainingGroup\",\"relationName\":\"ClubToClubCustomTrainingGroup\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"trainingGroupSchedules\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"ClubTrainingGroupSchedule\",\"relationName\":\"ClubToClubTrainingGroupSchedule\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"trainingScheduleGroups\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"ClubTrainingScheduleGroup\",\"relationName\":\"ClubToClubTrainingScheduleGroup\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"coach_groups\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"coach_groups\",\"relationName\":\"ClubTocoach_groups\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"players\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Player\",\"relationName\":\"ClubToPlayer\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"discountConfigs\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"TeamDiscountConfig\",\"relationName\":\"ClubToTeamDiscountConfig\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"trainingNotes\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"TrainingNote\",\"relationName\":\"ClubToTrainingNote\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"AdminPushSubscription\":{\"dbName\":\"admin_push_subscriptions\",\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"default\":{\"name\":\"uuid\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"clubId\",\"dbName\":\"club_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"endpoint\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"p256dh\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"auth\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"userAgent\",\"dbName\":\"user_agent\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"device\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"isActive\",\"dbName\":\"is_active\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Boolean\",\"default\":true,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"createdAt\",\"dbName\":\"created_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"updatedAt\",\"dbName\":\"updated_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":true},{\"name\":\"coach_group_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"club\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Club\",\"relationName\":\"AdminPushSubscriptionToClub\",\"relationFromFields\":[\"clubId\"],\"relationToFields\":[\"id\"],\"relationOnDelete\":\"Cascade\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"coach_groups\",\"kind\":\"object\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"coach_groups\",\"relationName\":\"AdminPushSubscriptionTocoach_groups\",\"relationFromFields\":[\"coach_group_id\"],\"relationToFields\":[\"id\"],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[[\"clubId\",\"endpoint\"]],\"uniqueIndexes\":[{\"name\":null,\"fields\":[\"clubId\",\"endpoint\"]}],\"isGenerated\":false},\"ClubTrainingGroupSchedule\":{\"dbName\":\"club_training_group_schedules\",\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"default\":{\"name\":\"dbgenerated\",\"args\":[\"gen_random_uuid()\"]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"clubId\",\"dbName\":\"club_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"teamGroup\",\"dbName\":\"team_group\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Int\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"trainingWeekdays\",\"dbName\":\"training_weekdays\",\"kind\":\"scalar\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"default\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"trainingDates\",\"dbName\":\"training_dates\",\"kind\":\"scalar\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"default\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"trainingWindowDays\",\"dbName\":\"training_window_days\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"default\":30,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"createdAt\",\"dbName\":\"created_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"updatedAt\",\"dbName\":\"updated_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":true},{\"name\":\"trainingTime\",\"dbName\":\"training_time\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"trainingDateTimes\",\"dbName\":\"training_date_times\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Json\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"club\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Club\",\"relationName\":\"ClubToClubTrainingGroupSchedule\",\"relationFromFields\":[\"clubId\"],\"relationToFields\":[\"id\"],\"relationOnDelete\":\"Cascade\",\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[[\"clubId\",\"teamGroup\"]],\"uniqueIndexes\":[{\"name\":null,\"fields\":[\"clubId\",\"teamGroup\"]}],\"isGenerated\":false},\"ClubTrainingScheduleGroup\":{\"dbName\":\"club_training_schedule_groups\",\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"default\":{\"name\":\"dbgenerated\",\"args\":[\"gen_random_uuid()\"]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"clubId\",\"dbName\":\"club_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"name\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"teamGroups\",\"dbName\":\"team_groups\",\"kind\":\"scalar\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"default\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"trainingWeekdays\",\"dbName\":\"training_weekdays\",\"kind\":\"scalar\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"default\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"trainingDates\",\"dbName\":\"training_dates\",\"kind\":\"scalar\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"default\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"trainingWindowDays\",\"dbName\":\"training_window_days\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"default\":30,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"createdAt\",\"dbName\":\"created_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"updatedAt\",\"dbName\":\"updated_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":true},{\"name\":\"trainingTime\",\"dbName\":\"training_time\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"trainingDateTimes\",\"dbName\":\"training_date_times\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Json\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"club\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Club\",\"relationName\":\"ClubToClubTrainingScheduleGroup\",\"relationFromFields\":[\"clubId\"],\"relationToFields\":[\"id\"],\"relationOnDelete\":\"Cascade\",\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"ClubCustomTrainingGroup\":{\"dbName\":\"club_custom_training_groups\",\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"default\":{\"name\":\"dbgenerated\",\"args\":[\"gen_random_uuid()\"]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"clubId\",\"dbName\":\"club_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"name\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"trainingWeekdays\",\"dbName\":\"training_weekdays\",\"kind\":\"scalar\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"default\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"trainingDates\",\"dbName\":\"training_dates\",\"kind\":\"scalar\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"default\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"trainingTime\",\"dbName\":\"training_time\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"trainingDateTimes\",\"dbName\":\"training_date_times\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Json\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"trainingWindowDays\",\"dbName\":\"training_window_days\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"default\":30,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"createdAt\",\"dbName\":\"created_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"updatedAt\",\"dbName\":\"updated_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":true},{\"name\":\"players\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"ClubCustomTrainingGroupPlayer\",\"relationName\":\"ClubCustomTrainingGroupToClubCustomTrainingGroupPlayer\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"club\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Club\",\"relationName\":\"ClubToClubCustomTrainingGroup\",\"relationFromFields\":[\"clubId\"],\"relationToFields\":[\"id\"],\"relationOnDelete\":\"Cascade\",\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"User\":{\"dbName\":\"users\",\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"default\":{\"name\":\"dbgenerated\",\"args\":[\"gen_random_uuid()\"]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"password\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"roles\",\"kind\":\"enum\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"UserRole\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"createdAt\",\"dbName\":\"created_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"updatedAt\",\"dbName\":\"updated_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"Player\":{\"dbName\":\"players\",\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"default\":{\"name\":\"dbgenerated\",\"args\":[\"gen_random_uuid()\"]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"clubId\",\"dbName\":\"club_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"fullName\",\"dbName\":\"full_name\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"status\",\"kind\":\"enum\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"PlayerStatus\",\"default\":\"paid\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"createdAt\",\"dbName\":\"created_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"updatedAt\",\"dbName\":\"updated_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"jerseyNumber\",\"dbName\":\"jersey_number\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"birthDate\",\"dbName\":\"birth_date\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"teamGroup\",\"dbName\":\"team_group\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Int\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"lastPaymentDate\",\"dbName\":\"last_payment_date\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"isActive\",\"dbName\":\"is_active\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Boolean\",\"default\":true,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"coach_group_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"adminNotifications\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"AdminNotification\",\"relationName\":\"AdminNotificationToPlayer\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"cards\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Card\",\"relationName\":\"CardToPlayer\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"customTrainingGroups\",\"kind\":\"object\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"ClubCustomTrainingGroupPlayer\",\"relationName\":\"ClubCustomTrainingGroupPlayerToPlayer\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"images\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Image\",\"relationName\":\"ImageToPlayer\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"discountUsages\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"PartnerDiscountUsage\",\"relationName\":\"PartnerDiscountUsageToPlayer\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"paymentLogs\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"PaymentLog\",\"relationName\":\"PaymentLogToPlayer\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"paymentWaivers\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"PaymentWaiver\",\"relationName\":\"PaymentWaiverToPlayer\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"playerNotification\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"PlayerNotification\",\"relationName\":\"PlayerToPlayerNotification\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"club\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Club\",\"relationName\":\"ClubToPlayer\",\"relationFromFields\":[\"clubId\"],\"relationToFields\":[\"id\"],\"relationOnDelete\":\"Cascade\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"coach_groups\",\"kind\":\"object\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"coach_groups\",\"relationName\":\"PlayerTocoach_groups\",\"relationFromFields\":[\"coach_group_id\"],\"relationToFields\":[\"id\"],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"pushSubscriptions\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"PushSubscription\",\"relationName\":\"PlayerToPushSubscription\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"trainingOptOuts\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"TrainingOptOut\",\"relationName\":\"PlayerToTrainingOptOut\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"ClubCustomTrainingGroupPlayer\":{\"dbName\":\"club_custom_training_group_players\",\"fields\":[{\"name\":\"groupId\",\"dbName\":\"group_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"playerId\",\"dbName\":\"player_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":true,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"createdAt\",\"dbName\":\"created_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"group\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"ClubCustomTrainingGroup\",\"relationName\":\"ClubCustomTrainingGroupToClubCustomTrainingGroupPlayer\",\"relationFromFields\":[\"groupId\"],\"relationToFields\":[\"id\"],\"relationOnDelete\":\"Cascade\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"player\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Player\",\"relationName\":\"ClubCustomTrainingGroupPlayerToPlayer\",\"relationFromFields\":[\"playerId\"],\"relationToFields\":[\"id\"],\"relationOnDelete\":\"Cascade\",\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":{\"name\":null,\"fields\":[\"groupId\",\"playerId\"]},\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"TrainingOptOut\":{\"dbName\":\"training_opt_outs\",\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"default\":{\"name\":\"dbgenerated\",\"args\":[\"gen_random_uuid()\"]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"playerId\",\"dbName\":\"player_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"trainingDate\",\"dbName\":\"training_date\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"createdAt\",\"dbName\":\"created_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"reasonCode\",\"dbName\":\"reason_code\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"reasonText\",\"dbName\":\"reason_text\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"player\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Player\",\"relationName\":\"PlayerToTrainingOptOut\",\"relationFromFields\":[\"playerId\"],\"relationToFields\":[\"id\"],\"relationOnDelete\":\"Cascade\",\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[[\"playerId\",\"trainingDate\"]],\"uniqueIndexes\":[{\"name\":null,\"fields\":[\"playerId\",\"trainingDate\"]}],\"isGenerated\":false},\"TrainingNote\":{\"dbName\":\"training_notes\",\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"default\":{\"name\":\"dbgenerated\",\"args\":[\"gen_random_uuid()\"]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"clubId\",\"dbName\":\"club_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"trainingDate\",\"dbName\":\"training_date\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"note\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"createdByUserId\",\"dbName\":\"created_by_user_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"createdAt\",\"dbName\":\"created_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"updatedAt\",\"dbName\":\"updated_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"club\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Club\",\"relationName\":\"ClubToTrainingNote\",\"relationFromFields\":[\"clubId\"],\"relationToFields\":[\"id\"],\"relationOnDelete\":\"Cascade\",\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[[\"clubId\",\"trainingDate\"]],\"uniqueIndexes\":[{\"name\":null,\"fields\":[\"clubId\",\"trainingDate\"]}],\"isGenerated\":false},\"Image\":{\"dbName\":\"images\",\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"default\":{\"name\":\"dbgenerated\",\"args\":[\"gen_random_uuid()\"]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"playerId\",\"dbName\":\"player_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"imageUrl\",\"dbName\":\"image_url\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"isAdminView\",\"dbName\":\"is_admin_view\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Boolean\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"player\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Player\",\"relationName\":\"ImageToPlayer\",\"relationFromFields\":[\"playerId\"],\"relationToFields\":[\"id\"],\"relationOnDelete\":\"Cascade\",\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"PaymentLog\":{\"dbName\":\"payment_logs\",\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"default\":{\"name\":\"dbgenerated\",\"args\":[\"gen_random_uuid()\"]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"playerId\",\"dbName\":\"player_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"paidAt\",\"dbName\":\"paid_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"recordedBy\",\"dbName\":\"recorded_by\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"default\":\"admin\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"paidFor\",\"dbName\":\"paid_for\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"player\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Player\",\"relationName\":\"PaymentLogToPlayer\",\"relationFromFields\":[\"playerId\"],\"relationToFields\":[\"id\"],\"relationOnDelete\":\"Cascade\",\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"PaymentWaiver\":{\"dbName\":\"payment_waivers\",\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"default\":{\"name\":\"dbgenerated\",\"args\":[\"gen_random_uuid()\"]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"playerId\",\"dbName\":\"player_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"waivedFor\",\"dbName\":\"waived_for\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"reason\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"createdBy\",\"dbName\":\"created_by\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"default\":\"admin\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"createdAt\",\"dbName\":\"created_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"updatedAt\",\"dbName\":\"updated_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"player\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Player\",\"relationName\":\"PaymentWaiverToPlayer\",\"relationFromFields\":[\"playerId\"],\"relationToFields\":[\"id\"],\"relationOnDelete\":\"Cascade\",\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[[\"playerId\",\"waivedFor\"]],\"uniqueIndexes\":[{\"name\":null,\"fields\":[\"playerId\",\"waivedFor\"]}],\"isGenerated\":false},\"PushSubscription\":{\"dbName\":\"push_subscriptions\",\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"default\":{\"name\":\"uuid\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"playerId\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"endpoint\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":true,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"p256dh\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"auth\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"userAgent\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"device\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"isActive\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Boolean\",\"default\":true,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"updatedAt\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":true},{\"name\":\"member\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Player\",\"relationName\":\"PlayerToPushSubscription\",\"relationFromFields\":[\"playerId\"],\"relationToFields\":[\"id\"],\"relationOnDelete\":\"Cascade\",\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"PlayerNotification\":{\"dbName\":\"player_notifications\",\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"default\":{\"name\":\"uuid\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"playerId\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"type\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"title\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"body\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"url\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"sentAt\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"readAt\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"player\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Player\",\"relationName\":\"PlayerToPlayerNotification\",\"relationFromFields\":[\"playerId\"],\"relationToFields\":[\"id\"],\"relationOnDelete\":\"Cascade\",\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"AdminNotification\":{\"dbName\":\"admin_notifications\",\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"default\":{\"name\":\"uuid\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"clubId\",\"dbName\":\"club_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"playerId\",\"dbName\":\"player_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"type\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"title\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"body\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"url\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"sentAt\",\"dbName\":\"sent_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"readAt\",\"dbName\":\"read_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"club\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Club\",\"relationName\":\"AdminNotificationToClub\",\"relationFromFields\":[\"clubId\"],\"relationToFields\":[\"id\"],\"relationOnDelete\":\"Cascade\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"player\",\"kind\":\"object\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Player\",\"relationName\":\"AdminNotificationToPlayer\",\"relationFromFields\":[\"playerId\"],\"relationToFields\":[\"id\"],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"Card\":{\"dbName\":\"cards\",\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"default\":{\"name\":\"uuid\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"cardCode\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":true,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"playerId\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"isActive\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Boolean\",\"default\":true,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"player\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Player\",\"relationName\":\"CardToPlayer\",\"relationFromFields\":[\"playerId\"],\"relationToFields\":[\"id\"],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"CronJobRun\":{\"dbName\":\"cron_job_runs\",\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"BigInt\",\"default\":{\"name\":\"autoincrement\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"jobName\",\"dbName\":\"job_name\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"runYear\",\"dbName\":\"run_year\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Int\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"runMonth\",\"dbName\":\"run_month\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Int\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"completedAt\",\"dbName\":\"completed_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"createdAt\",\"dbName\":\"created_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"failedAt\",\"dbName\":\"failed_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"errorMessage\",\"dbName\":\"error_message\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[[\"jobName\",\"runYear\",\"runMonth\"]],\"uniqueIndexes\":[{\"name\":null,\"fields\":[\"jobName\",\"runYear\",\"runMonth\"]}],\"isGenerated\":false},\"PartnerDiscountUsage\":{\"dbName\":\"partner_discount_usage\",\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"default\":{\"name\":\"uuid\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"playerId\",\"dbName\":\"player_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"partner\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"action\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"date\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"createdAt\",\"dbName\":\"created_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"player\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Player\",\"relationName\":\"PartnerDiscountUsageToPlayer\",\"relationFromFields\":[\"playerId\"],\"relationToFields\":[\"id\"],\"relationOnDelete\":\"Cascade\",\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"PageClick\":{\"dbName\":\"page_clicks\",\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"default\":{\"name\":\"dbgenerated\",\"args\":[\"gen_random_uuid()\"]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"clickedAt\",\"dbName\":\"clicked_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"action\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"default\":\"unknown\",\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"PartnerDiscount\":{\"dbName\":\"partner_discounts\",\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"default\":{\"name\":\"uuid\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"name\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"logoUrl\",\"dbName\":\"logo_url\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"badgeText\",\"dbName\":\"badge_text\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"description\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"code\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"validUntil\",\"dbName\":\"valid_until\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"storeUrl\",\"dbName\":\"store_url\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"terms\",\"kind\":\"scalar\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"themeColor\",\"dbName\":\"theme_color\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"createdAt\",\"dbName\":\"created_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"updatedAt\",\"dbName\":\"updated_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":true},{\"name\":\"teamConfigs\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"TeamDiscountConfig\",\"relationName\":\"PartnerDiscountToTeamDiscountConfig\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"TeamDiscountConfig\":{\"dbName\":\"team_discount_configs\",\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"default\":{\"name\":\"uuid\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"clubId\",\"dbName\":\"club_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"teamGroup\",\"dbName\":\"team_group\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Int\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"discountId\",\"dbName\":\"discount_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"order\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"default\":0,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"isVisible\",\"dbName\":\"is_visible\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Boolean\",\"default\":true,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"club\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Club\",\"relationName\":\"ClubToTeamDiscountConfig\",\"relationFromFields\":[\"clubId\"],\"relationToFields\":[\"id\"],\"relationOnDelete\":\"Cascade\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"discount\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"PartnerDiscount\",\"relationName\":\"PartnerDiscountToTeamDiscountConfig\",\"relationFromFields\":[\"discountId\"],\"relationToFields\":[\"id\"],\"relationOnDelete\":\"Cascade\",\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[[\"clubId\",\"teamGroup\",\"discountId\"]],\"uniqueIndexes\":[{\"name\":null,\"fields\":[\"clubId\",\"teamGroup\",\"discountId\"]}],\"isGenerated\":false},\"coach_groups\":{\"dbName\":null,\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"default\":{\"name\":\"dbgenerated\",\"args\":[\"gen_random_uuid()\"]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"club_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"name\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"created_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"updated_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"admin_push_subscriptions\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"AdminPushSubscription\",\"relationName\":\"AdminPushSubscriptionTocoach_groups\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"clubs\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Club\",\"relationName\":\"ClubTocoach_groups\",\"relationFromFields\":[\"club_id\"],\"relationToFields\":[\"id\"],\"relationOnDelete\":\"Cascade\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"players\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Player\",\"relationName\":\"PlayerTocoach_groups\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false}},\"enums\":{\"PlayerStatus\":{\"values\":[{\"name\":\"paid\",\"dbName\":null},{\"name\":\"warning\",\"dbName\":null},{\"name\":\"overdue\",\"dbName\":null}],\"dbName\":\"player_status\"},\"UserRole\":{\"values\":[{\"name\":\"admin\",\"dbName\":null},{\"name\":\"coach\",\"dbName\":null}],\"dbName\":null}},\"types\":{}}")
defineDmmfProperty(exports.Prisma, config.runtimeDataModel)
config.engineWasm = undefined


const { warnEnvConflicts } = require('./runtime/library.js')

warnEnvConflicts({
    rootEnvPath: config.relativeEnvPaths.rootEnvPath && path.resolve(config.dirname, config.relativeEnvPaths.rootEnvPath),
    schemaEnvPath: config.relativeEnvPaths.schemaEnvPath && path.resolve(config.dirname, config.relativeEnvPaths.schemaEnvPath)
})

const PrismaClient = getPrismaClient(config)
exports.PrismaClient = PrismaClient
Object.assign(exports, Prisma)

// file annotations for bundling tools to include these files
path.join(__dirname, "query_engine-windows.dll.node");
path.join(process.cwd(), "src/generated/prisma-client/query_engine-windows.dll.node")
// file annotations for bundling tools to include these files
path.join(__dirname, "schema.prisma");
path.join(process.cwd(), "src/generated/prisma-client/schema.prisma")
