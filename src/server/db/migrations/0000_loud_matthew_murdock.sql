CREATE SCHEMA "hono";
--> statement-breakpoint
CREATE TYPE "hono"."client_type" AS ENUM('pf', 'pj');--> statement-breakpoint
CREATE TYPE "hono"."employee_assignment" AS ENUM('aditional', 'admin_assistant', 'recommending', 'recommended', 'responsible');--> statement-breakpoint
CREATE TYPE "hono"."contract_legal_area" AS ENUM('civil', 'family', 'other', 'social_security', 'labor');--> statement-breakpoint
CREATE TYPE "hono"."employee_role" AS ENUM('admin', 'user');--> statement-breakpoint
CREATE TYPE "hono"."employee_type" AS ENUM('lawyer', 'admin_assistant');--> statement-breakpoint
CREATE TYPE "hono"."entity_status" AS ENUM('active', 'inactive');--> statement-breakpoint
CREATE TYPE "hono"."revenue_type" AS ENUM('administrative', 'judicial', 'compliance');--> statement-breakpoint
CREATE TABLE "hono"."clients" (
	"id" text PRIMARY KEY NOT NULL,
	"full_name" text NOT NULL,
	"cnpjf" text NOT NULL,
	"email" text NOT NULL,
	"mobile_phone" text NOT NULL,
	"type" "hono"."client_type" NOT NULL,
	"contract_count" integer NOT NULL,
	"status" "hono"."entity_status" DEFAULT 'active' NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp,
	CONSTRAINT "clients_cnpjf_unique" UNIQUE("cnpjf")
);
--> statement-breakpoint
CREATE TABLE "hono"."contract_employee" (
	"id" text PRIMARY KEY NOT NULL,
	"contract_id" text NOT NULL,
	"employee_id" text NOT NULL,
	"assignment" "hono"."employee_assignment" NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "hono"."contracts" (
	"id" text PRIMARY KEY NOT NULL,
	"client_id" text NOT NULL,
	"identification" text NOT NULL,
	"fee_percent" real NOT NULL,
	"observation" text,
	"legal_area" "hono"."contract_legal_area" NOT NULL,
	"status" "hono"."entity_status" DEFAULT 'active' NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp,
	CONSTRAINT "contracts_identification_unique" UNIQUE("identification")
);
--> statement-breakpoint
CREATE TABLE "hono"."employees" (
	"id" text PRIMARY KEY NOT NULL,
	"full_name" text NOT NULL,
	"oab_number" text,
	"remuneration_percent" real NOT NULL,
	"type" "hono"."employee_type" NOT NULL,
	"role" "hono"."employee_role" DEFAULT 'user' NOT NULL,
	"contract_count" integer NOT NULL,
	"status" "hono"."entity_status" DEFAULT 'active' NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp,
	CONSTRAINT "employees_oab_number_unique" UNIQUE("oab_number")
);
--> statement-breakpoint
CREATE TABLE "hono"."fees" (
	"id" text PRIMARY KEY NOT NULL,
	"revenue_id" text NOT NULL,
	"contract_id" text NOT NULL,
	"value" real NOT NULL,
	"installment_number" integer NOT NULL,
	"payment_date" date NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "hono"."revenues" (
	"id" text PRIMARY KEY NOT NULL,
	"contract_id" text NOT NULL,
	"amount" real NOT NULL,
	"entry_value" real NOT NULL,
	"installments_total" integer NOT NULL,
	"installments_paid" integer NOT NULL,
	"payment_start_date" date NOT NULL,
	"type" "hono"."revenue_type" NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "hono"."remunerations" (
	"id" text PRIMARY KEY NOT NULL,
	"fee_id" text NOT NULL,
	"contract_id" text NOT NULL,
	"contract_employee_id" text NOT NULL,
	"remuneration_percentage" real NOT NULL,
	"value" real NOT NULL,
	"payment_date" date NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp
);
