-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "first_name" VARCHAR,
    "last_name" VARCHAR,
    "password" VARCHAR,
    "email" VARCHAR,
    "profile_image" VARCHAR,
    "is_login" BOOLEAN,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "transaction" (
    "id" SERIAL NOT NULL,
    "invoice_number" VARCHAR,
    "transaction_type" VARCHAR,
    "total_amount" INTEGER,
    "created_on" DATE,
    "user_id" INTEGER,
    "service_id" INTEGER,

    CONSTRAINT "transaction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "balance" (
    "id" SERIAL NOT NULL,
    "balance" INTEGER,
    "user_id" INTEGER,

    CONSTRAINT "balance_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "banner" (
    "id" SERIAL NOT NULL,
    "banner_name" VARCHAR,
    "banner_image" VARCHAR,
    "description" VARCHAR,

    CONSTRAINT "banner_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "services" (
    "id" SERIAL NOT NULL,
    "service_code" VARCHAR,
    "service_name" VARCHAR,
    "service_icon" VARCHAR,
    "service_tarif" INTEGER,

    CONSTRAINT "services_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "authentication" (
    "id" SERIAL NOT NULL,
    "access_token" VARCHAR,
    "refresh_token" VARCHAR,
    "user_id" INTEGER,

    CONSTRAINT "authentication_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "transaction" ADD CONSTRAINT "fk_service" FOREIGN KEY ("service_id") REFERENCES "services"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "transaction" ADD CONSTRAINT "fk_user" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "balance" ADD CONSTRAINT "fk_user" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "authentication" ADD CONSTRAINT "fk_user_authentication" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
