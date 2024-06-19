/*
  Warnings:

  - You are about to drop the `Tarefa` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Usuario` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Tarefa" DROP CONSTRAINT "Tarefa_usuario_id_fkey";

-- DropTable
DROP TABLE "Tarefa";

-- DropTable
DROP TABLE "Usuario";

-- CreateTable
CREATE TABLE "usuario" (
    "id" SERIAL NOT NULL,
    "email" VARCHAR(150) NOT NULL,
    "senha" VARCHAR(255) NOT NULL,
    "nome" VARCHAR(100),
    "telefone" VARCHAR(11),

    CONSTRAINT "usuario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tarefa" (
    "id" SERIAL NOT NULL,
    "titulo" VARCHAR(50) NOT NULL,
    "descricao" VARCHAR(255) NOT NULL,
    "finalizada" BOOLEAN NOT NULL DEFAULT false,
    "id_usuario" INTEGER NOT NULL,

    CONSTRAINT "tarefa_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "usuario_email_key" ON "usuario"("email");

-- AddForeignKey
ALTER TABLE "tarefa" ADD CONSTRAINT "tarefa_id_usuario_fkey" FOREIGN KEY ("id_usuario") REFERENCES "usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
