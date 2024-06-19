-- CreateTable
CREATE TABLE "Usuario" (
    "id" SERIAL NOT NULL,
    "email" VARCHAR(150) NOT NULL,
    "senha" VARCHAR(255) NOT NULL,
    "nome" VARCHAR(100),
    "telefone" VARCHAR(11),

    CONSTRAINT "Usuario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tarefa" (
    "id" SERIAL NOT NULL,
    "titulo" VARCHAR(50) NOT NULL,
    "descricao" VARCHAR(255) NOT NULL,
    "finalizada" BOOLEAN NOT NULL DEFAULT false,
    "usuario_id" INTEGER NOT NULL,

    CONSTRAINT "Tarefa_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_email_key" ON "Usuario"("email");

-- AddForeignKey
ALTER TABLE "Tarefa" ADD CONSTRAINT "Tarefa_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
