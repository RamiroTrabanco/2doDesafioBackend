const fs = require("fs")

class ProductManager {

    constructor(){
        this.products = []
        this.path = "./products.json"
    }

    async addProducts(title, description, price, thumbnail, code, stock){
        const product = {
            title,
            description,
            price,
            thumbnail,
            code,
            stock,
            id: this.#generateId()
        }

        try {

        const productCode = this.#validateCodeProduct(code)
        console.log(code)
        console.log(productCode)

        if(productCode === undefined && title && description && price && thumbnail && stock){
            const prodsFile = await this.getProducts()
            prodsFile.push(product)
            await fs.promises.writeFile(this.path, JSON.stringify(prodsFile))
        }}
        catch(error){
            console.log("error")
        }

    }

    #validateCodeProduct(code) {
        return this.products.find(product=>product.code===code)
    }

    async getProducts(){
        try {
            if(fs.existsSync(this.path)){
                const prods = await fs.promises.readFile(this.path, "utf-8")
                const prodsJS = JSON.parse(prods)
                this.products.push(prodsJS)
                return prodsJS 
            } else {
                return []
            }
        }
        catch(error) {
            console.log(error)
        }
    }
    
    async getProductsById(id){
        const prodsFileId = await this.getProducts()
        const productById = await prodsFileId.find((product)=>product.id===id)
        if (productById === undefined){
            console.log("Not found")
        } else {
            return productById
        }
    }

    async updateProduct(prod){
        console.log(prod)
        let updateProd = await this.getProductsById(prod.id)
        if(updateProd !== prod && updateProd.id == prod.id){
            prod = updateProd
            return this.addProducts(prod)
        } else {
            console.log("El producto no se pudo actualizar")
        }
    }

    #generateId() {
        let id = 1
        if (this.products.length !== 0){
            id = this.products[this.products.length - 1].id + 1
        }
        return id
    }
}


/* PRUEBA

let product = new ProductManager()

product.addProducts("Manzana", "Red", 10, "https://images.emojiterra.com/google/android-pie/512px/1f34e.png", 50, 100)
product.addProducts("Naranja", "Orange", 10, "https://images.emojiterra.com/google/android-pie/512px/1f34e.png", 500, 100)
product.addProducts("Naranja", 10, "https://images.emojiterra.com/google/android-pie/512px/1f34e.png", 50, 100)
console.log(product.getProducts())
console.log(product.getProductsById(1))
console.log(product.getProductsById(5))
console.log(product.getProductsById(1))
let cereza = {
    title: "Cereza",
    description: "Roja",
    price: 5,
    image: "imagen",
    code: 101,
    stock: 5000,
    id: 1
} 
product.updateProduct(cereza)


arreglar no poder agregar dos productos distintos
arreglar updateProduct
arreglar deleteProduct */

let product = new ProductManager()

product.addProducts("Naranja", "Orange", 10, "https://images.emojiterra.com/google/android-pie/512px/1f34e.png", 500, 100)/* 
product.addProducts("Naranja", "Orange", 10, "https://images.emojiterra.com/google/android-pie/512px/1f34e.png", 500, 100)
product.addProducts("Manzana", "Red", 10, "https://images.emojiterra.com/google/android-pie/512px/1f34e.png", 50, 100) */
/* let cereza = {
    title: "Cereza",
    description: "Roja",
    price: 5,
    image: "imagen",
    code: 101,
    stock: 5000,
    id: 1
} 
product.updateProduct(cereza) */
