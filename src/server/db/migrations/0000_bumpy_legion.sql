CREATE SCHEMA "hono_claude";
--> statement-breakpoint
CREATE TYPE "hono_claude"."audit_action" AS ENUM('create', 'update', 'delete', 'soft_delete', 'restore');--> statement-breakpoint
CREATE TYPE "hono_claude"."client_type" AS ENUM('pf', 'pj');--> statement-breakpoint
CREATE TYPE "hono_claude"."contract_employee_type" AS ENUM('additional', 'admin_assistant', 'recommending', 'recommended', 'responsible');--> statement-breakpoint
CREATE TYPE "hono_claude"."contract_legal_area" AS ENUM('civil', 'family', 'other', 'social_security', 'labor');--> statement-breakpoint
CREATE TYPE "hono_claude"."contract_status" AS ENUM('active', 'completed', 'cancelled');--> statement-breakpoint
CREATE TYPE "hono_claude"."employee_role" AS ENUM('admin', 'user');--> statement-breakpoint
CREATE TYPE "hono_claude"."employee_type" AS ENUM('lawyer', 'admin_assistant');--> statement-breakpoint
CREATE TYPE "hono_claude"."entity_status" AS ENUM('active', 'inactive');--> statement-breakpoint
CREATE TYPE "hono_claude"."revenue_type" AS ENUM('administrative', 'judicial', 'succumbency');--> statement-breakpoint
CREATE TABLE "hono_claude"."accounts" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"account_id" text NOT NULL,
	"provider_id" text NOT NULL,
	"access_token" text,
	"refresh_token" text,
	"id_token" text,
	"expires_at" timestamp,
	"password" text
);
--> statement-breakpoint
CREATE TABLE "hono_claude"."audit_logs" (
	"id" text PRIMARY KEY NOT NULL,
	"table_name" text NOT NULL,
	"record_id" text NOT NULL,
	"action" "hono_claude"."audit_action" NOT NULL,
	"user_id" text NOT NULL,
	"old_values" jsonb,
	"new_values" jsonb,
	"ip_address" text,
	"user_agent" text,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "hono_claude"."clients" (
	"id" text PRIMARY KEY NOT NULL,
	"full_name" text NOT NULL,
	"cnpjf" text NOT NULL,
	"email" text,
	"mobile_phone" text,
	"type" "hono_claude"."client_type" NOT NULL,
	"contract_count" integer,
	"status" "hono_claude"."entity_status" DEFAULT 'active' NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp,
	"deleted_at" timestamp,
	"created_by" text,
	"updated_by" text,
	"deleted_by" text,
	CONSTRAINT "clients_cnpjf_unique" UNIQUE("cnpjf")
);
--> statement-breakpoint
CREATE TABLE "hono_claude"."contract_employee" (
	"id" text PRIMARY KEY NOT NULL,
	"contract_id" text NOT NULL,
	"employee_id" text NOT NULL,
	"assignment" "hono_claude"."contract_employee_type" NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp,
	"deleted_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "hono_claude"."contracts" (
	"id" text PRIMARY KEY NOT NULL,
	"client_id" text NOT NULL,
	"identification" text NOT NULL,
	"fee_percent" real NOT NULL,
	"observation" text,
	"legal_area" "hono_claude"."contract_legal_area" NOT NULL,
	"contract_status" "hono_claude"."contract_status" DEFAULT 'active' NOT NULL,
	"allow_status_change" boolean DEFAULT true,
	"status" "hono_claude"."entity_status" DEFAULT 'active' NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp,
	"deleted_at" timestamp,
	"created_by" text,
	"updated_by" text,
	"deleted_by" text,
	CONSTRAINT "contracts_identification_unique" UNIQUE("identification")
);
--> statement-breakpoint
CREATE TABLE "hono_claude"."employees" (
	"id" text PRIMARY KEY NOT NULL,
	"full_name" text NOT NULL,
	"email" text NOT NULL,
	"oab_number" text,
	"remuneration_percent" real NOT NULL,
	"referrer_percent" real NOT NULL,
	"type" "hono_claude"."employee_type" NOT NULL,
	"role" "hono_claude"."employee_role" DEFAULT 'user' NOT NULL,
	"password" text NOT NULL,
	"image" text,
	"contract_count" integer NOT NULL,
	"status" "hono_claude"."entity_status" DEFAULT 'active' NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp,
	"deleted_at" timestamp,
	"created_by" text,
	"updated_by" text,
	"deleted_by" text,
	CONSTRAINT "employees_email_unique" UNIQUE("email"),
	CONSTRAINT "employees_oab_number_unique" UNIQUE("oab_number")
);
--> statement-breakpoint
CREATE TABLE "hono_claude"."fees" (
	"id" text PRIMARY KEY NOT NULL,
	"revenue_id" text NOT NULL,
	"contract_id" text NOT NULL,
	"amount" real NOT NULL,
	"installment_number" integer NOT NULL,
	"payment_date" date NOT NULL,
	"generate_remuneration" boolean DEFAULT true NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp,
	"deleted_at" timestamp,
	"created_by" text,
	"updated_by" text,
	"deleted_by" text
);
--> statement-breakpoint
CREATE TABLE "hono_claude"."revenues" (
	"id" text PRIMARY KEY NOT NULL,
	"contract_id" text NOT NULL,
	"total_value" real NOT NULL,
	"down_payment" real DEFAULT 0 NOT NULL,
	"installments_total" integer NOT NULL,
	"installments_paid" integer DEFAULT 0 NOT NULL,
	"payment_start_date" date NOT NULL,
	"type" "hono_claude"."revenue_type" NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp,
	"deleted_at" timestamp,
	"created_by" text,
	"updated_by" text,
	"deleted_by" text
);
--> statement-breakpoint
CREATE TABLE "hono_claude"."remunerations" (
	"id" text PRIMARY KEY NOT NULL,
	"fee_id" text NOT NULL,
	"contract_id" text NOT NULL,
	"contract_employee_id" text NOT NULL,
	"percentage" real NOT NULL,
	"amount" real NOT NULL,
	"payment_date" date NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp,
	"deleted_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "hono_claude"."sessions" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"expires_at" timestamp NOT NULL,
	"ip_address" text,
	"user_agent" text
);
--> statement-breakpoint
CREATE TABLE "hono_claude"."verifications" (
	"id" text PRIMARY KEY NOT NULL,
	"identifier" text NOT NULL,
	"value" text NOT NULL,
	"expires_at" timestamp NOT NULL
);
