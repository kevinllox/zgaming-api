-- CreateTable
CREATE TABLE `Roles` (
    `idRol` INTEGER NOT NULL AUTO_INCREMENT,
    `nombreRol` VARCHAR(15) NOT NULL,
    `descripcionRol` VARCHAR(50) NOT NULL,

    PRIMARY KEY (`idRol`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `OpcionesMenu` (
    `idOpcion` INTEGER NOT NULL AUTO_INCREMENT,
    `descripcionOpcion` VARCHAR(500) NOT NULL,

    PRIMARY KEY (`idOpcion`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Categoria` (
    `idCategoria` INTEGER NOT NULL AUTO_INCREMENT,
    `nombreCategoria` VARCHAR(500) NOT NULL,

    PRIMARY KEY (`idCategoria`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Usuario` (
    `idUsuario` INTEGER NOT NULL AUTO_INCREMENT,
    `contrasenia` VARCHAR(50) NOT NULL,
    `correo` VARCHAR(50) NOT NULL,
    `nombre` VARCHAR(15) NOT NULL,
    `numeroTelefono` BIGINT NULL,
    `nombreUsuario` VARCHAR(20) NOT NULL,
    `activo` BOOLEAN NULL,
    `idRol` INTEGER NOT NULL,

    PRIMARY KEY (`idUsuario`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `RolesOpcionMenu` (
    `idRolMenu` INTEGER NOT NULL AUTO_INCREMENT,
    `idOpcion` INTEGER NOT NULL,
    `idRol` INTEGER NOT NULL,

    PRIMARY KEY (`idRolMenu`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Producto` (
    `idProducto` INTEGER NOT NULL AUTO_INCREMENT,
    `nombreProducto` VARCHAR(150) NOT NULL,
    `descripcion` VARCHAR(500) NULL,
    `precio` DECIMAL(10, 5) NOT NULL,
    `stock` INTEGER NULL,
    `imagenProducto` VARCHAR(100) NULL,
    `isFavorito` BOOLEAN NULL,
    `idCategoria` INTEGER NOT NULL,

    PRIMARY KEY (`idProducto`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Compra` (
    `idCompra` INTEGER NOT NULL AUTO_INCREMENT,
    `cantidadCompra` INTEGER NULL,
    `idUsuario` INTEGER NOT NULL,

    PRIMARY KEY (`idCompra`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `detalleCompra` (
    `idDetalle` INTEGER NOT NULL AUTO_INCREMENT,
    `fechaCompra` DATETIME(3) NULL,
    `numeroOrden` INTEGER NULL,
    `idProducto` INTEGER NULL,
    `idCompra` INTEGER NULL,

    PRIMARY KEY (`idDetalle`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Usuario` ADD CONSTRAINT `Usuario_idRol_fkey` FOREIGN KEY (`idRol`) REFERENCES `Roles`(`idRol`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `RolesOpcionMenu` ADD CONSTRAINT `RolesOpcionMenu_idOpcion_fkey` FOREIGN KEY (`idOpcion`) REFERENCES `OpcionesMenu`(`idOpcion`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `RolesOpcionMenu` ADD CONSTRAINT `RolesOpcionMenu_idRol_fkey` FOREIGN KEY (`idRol`) REFERENCES `Roles`(`idRol`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Producto` ADD CONSTRAINT `Producto_idCategoria_fkey` FOREIGN KEY (`idCategoria`) REFERENCES `Categoria`(`idCategoria`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Compra` ADD CONSTRAINT `Compra_idUsuario_fkey` FOREIGN KEY (`idUsuario`) REFERENCES `Usuario`(`idUsuario`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `detalleCompra` ADD CONSTRAINT `detalleCompra_idProducto_fkey` FOREIGN KEY (`idProducto`) REFERENCES `Producto`(`idProducto`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `detalleCompra` ADD CONSTRAINT `detalleCompra_idCompra_fkey` FOREIGN KEY (`idCompra`) REFERENCES `Compra`(`idCompra`) ON DELETE SET NULL ON UPDATE CASCADE;

-- END --