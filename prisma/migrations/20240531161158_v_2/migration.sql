-- DropIndex
DROP INDEX `Compra_idUsuario_fkey` ON `compra`;

-- DropIndex
DROP INDEX `Usuario_idRol_fkey` ON `usuario`;

-- AlterTable
ALTER TABLE `usuario` MODIFY `contrasenia` VARCHAR(255) NOT NULL,
    MODIFY `correo` VARCHAR(255) NOT NULL,
    MODIFY `nombre` VARCHAR(255) NOT NULL,
    MODIFY `nombreUsuario` VARCHAR(255) NOT NULL;
