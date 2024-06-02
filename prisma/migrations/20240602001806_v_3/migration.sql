-- CreateTable
CREATE TABLE `usuarioProducto` (
    `idUsuarioProducto` INTEGER NOT NULL AUTO_INCREMENT,
    `idUsuario` INTEGER NULL,
    `idProducto` INTEGER NULL,

    PRIMARY KEY (`idUsuarioProducto`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `usuarioProducto` ADD CONSTRAINT `usuarioProducto_idUsuario_fkey` FOREIGN KEY (`idUsuario`) REFERENCES `Usuario`(`idUsuario`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `usuarioProducto` ADD CONSTRAINT `usuarioProducto_idProducto_fkey` FOREIGN KEY (`idProducto`) REFERENCES `Producto`(`idProducto`) ON DELETE SET NULL ON UPDATE CASCADE;
