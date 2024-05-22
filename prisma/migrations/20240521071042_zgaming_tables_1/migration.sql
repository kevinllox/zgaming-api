-- Eliminar claves foráneas
ALTER TABLE `Compra` DROP FOREIGN KEY `Compra_idUsuario_fkey`;
ALTER TABLE `detalleCompra` DROP FOREIGN KEY `detalleCompra_idCompra_fkey`;
ALTER TABLE `detalleCompra` DROP FOREIGN KEY `detalleCompra_idProducto_fkey`;
ALTER TABLE `Producto` DROP FOREIGN KEY `Producto_idCategoria_fkey`;
ALTER TABLE `RolesOpcionMenu` DROP FOREIGN KEY `RolesOpcionMenu_idOpcion_fkey`;
ALTER TABLE `RolesOpcionMenu` DROP FOREIGN KEY `RolesOpcionMenu_idRol_fkey`;
ALTER TABLE `Usuario` DROP FOREIGN KEY `Usuario_idRol_fkey`;

-- Eiminar los índices
DROP INDEX `Compra_idUsuario_fkey` ON `Compra`;
DROP INDEX `detalleCompra_idCompra_fkey` ON `detalleCompra`;
DROP INDEX `detalleCompra_idProducto_fkey` ON `detalleCompra`;
DROP INDEX `Producto_idCategoria_fkey` ON `Producto`;
DROP INDEX `RolesOpcionMenu_idOpcion_fkey` ON `RolesOpcionMenu`;
DROP INDEX `RolesOpcionMenu_idRol_fkey` ON `RolesOpcionMenu`;
DROP INDEX `Usuario_idRol_fkey` ON `Usuario`;
