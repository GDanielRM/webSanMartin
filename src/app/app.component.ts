import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    title = 'webSanMartin';
    products: any[] = [];

    idProduct: number = 0;
    name: string = '';
    description: string = '';
    price: number = 0.0;
    exist: number = 0;
    typeSelected = 0;

    productTypes: any[] = [];

    constructor(
        private http: HttpClient,
    ) {
        this.getProductTypes();
        this.getProducts();
    }

    getProducts() {
        this.http.get("http://localhost:57502/producto/").subscribe((response: any) => {
            if (!response.Status) {
                throw new Error(response.message);
            }

            this.products = response.Data;
        }, err => {
            alert(err.message);
        });
    }

    crea() {
        if (this.name == '') {
            alert("El nombre del producto no puede ir vacío");
            return;
        }

        if (this.description == '') {
            alert("La descripcion no puede ir vacía");
            return;
        }

        if (this.price <= 0) {
            alert("El precio debe ser mayor a 0");
            return;
        }

        if (this.typeSelected <= 0) {
            alert("Seleccione un tipo de producto");
            return;
        }

        var body = {
            NombreProducto: this.name,
            DescripcionProducto: this.description,
            Precio: this.price,
            Existencia: this.exist,
            IdTipoProducto: this.typeSelected
        }

        const headers = new HttpHeaders().set('Content-Type', 'application/json');
        this.http.post("http://localhost:57502/producto/", body, { headers: headers }).subscribe((response: any) => {
            if (!response.Status) {
                throw new Error(response.message);
            }

            this.getProducts();
            this.clean();

            alert(response.Message);
        }, err => {
            alert(err.message);
        });
    }

    actualiza() {
        if (this.idProduct == 0) {
            alert("Seleccione un producto");
            return;
        }

        if (this.name == '') {
            alert("El nombre del producto no puede ir vacío");
            return;
        }

        if (this.description == '') {
            alert("La descripcion no puede ir vacía");
            return;
        }

        if (this.price <= 0) {
            alert("El precio debe ser mayor a 0");
            return;
        }

        if (this.typeSelected <= 0) {
            alert("Seleccione un tipo de producto");
            return;
        }

        var body = {
            Id:this.idProduct,
            NombreProducto: this.name,
            DescripcionProducto: this.description,
            Precio: this.price,
            Existencia: this.exist,
            IdTipoProducto: this.typeSelected
        }

        const headers = new HttpHeaders().set('Content-Type', 'application/json');
        this.http.put("http://localhost:57502/producto/", body, { headers: headers }).subscribe((response: any) => {
            if (!response.Status) {
                throw new Error(response.message);
            }

            this.getProducts();
            this.clean();

            alert(response.Message);
        }, err => {
            alert(err.message);
        });
    }

    elimina() {
        if (this.idProduct == 0) {
            alert("Por favor, seleccione un producto");
            return;
        }

        this.http.delete("http://localhost:57502/producto/" + this.idProduct).subscribe((response: any) => {
            if (!response.Status) {
                throw new Error(response.message);
            }

            this.getProducts();
            this.clean();

            alert(response.Message);
        }, err => {
            alert(err.message);
        });
    }

    getProductTypes() {
        this.http.get("http://localhost:57502/producto/tipo").subscribe((response: any) => {
            if (!response.Status) {
                throw new Error(response.message);
            }

            this.productTypes = response.Data;
        }, err => {
            alert(err.message);
        });
    }


    selectProduct(id: number = 0) {
        var productSelected = this.products.filter(x => x.Id === id);

        this.idProduct = productSelected[0].Id;
        this.name = productSelected[0].NombreProducto;
        this.description = productSelected[0].DescripcionProducto;
        this.price = productSelected[0].Precio;
        this.exist = productSelected[0].Existencia;
        this.typeSelected = productSelected[0].IdTipoProducto;
    }

    clean() {
        this.idProduct = 0;
        this.name = '';
        this.description = '';
        this.price = 0;
        this.exist = 0;
        this.typeSelected = 0;
    }
}
