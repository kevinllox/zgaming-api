-- AddForeignKey
ALTER TABLE `RolesOpcionMenu` ADD CONSTRAINT `RolesOpcionMenu_idOpcion_fkey` FOREIGN KEY (`idOpcion`) REFERENCES `OpcionesMenu`(`idOpcion`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `RolesOpcionMenu` ADD CONSTRAINT `RolesOpcionMenu_idRol_fkey` FOREIGN KEY (`idRol`) REFERENCES `Roles`(`idRol`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Producto` ADD CONSTRAINT `Producto_idCategoria_fkey` FOREIGN KEY (`idCategoria`) REFERENCES `Categoria`(`idCategoria`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `detalleCompra` ADD CONSTRAINT `detalleCompra_idProducto_fkey` FOREIGN KEY (`idProducto`) REFERENCES `Producto`(`idProducto`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `detalleCompra` ADD CONSTRAINT `detalleCompra_idCompra_fkey` FOREIGN KEY (`idCompra`) REFERENCES `Compra`(`idCompra`) ON DELETE SET NULL ON UPDATE CASCADE;
