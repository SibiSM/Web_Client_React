'use client'

import "./productspecific.css"
import axiosInstance from "../../../../axiosInstance"
import { useEffect, useState } from "react"


type productDataType = {
    [key : string ]: string
}





export default function Page({params}: {params: { product: string }}) {

const [productdetails, setProductDetails]:any = useState(null)
const [quantity, setQuantity] = useState(0)
const [isAddedToCart, setIsAddedToCart] = useState(false)


useEffect(() => {
    fetchProductDetails()
    fetchCartProducts()
}, [])

const fetchProductDetails = async () => {
    const fetchResponse = await axiosInstance.post('/products/fetch-product-details' , {
        id:params.product
        
    })

    if(fetchResponse.data.success){
           console.log(fetchResponse.data.data[0],"details")
        setProductDetails(fetchResponse.data.data[0])
    }
}

// const createProducts = async () => {
//           const response =  await axiosInstance.post('/products/create-product',{id})
// }
const handleAddCart = async() => {
    const updateCartResponse = await axiosInstance.post('/cart/add-product',{
        userId: "12345",
        productId:params.product,
        quantity: 1
    })
    if(updateCartResponse.data.success){
        setIsAddedToCart(true)
        setQuantity(1)
    }
   
}

const checkIfProductExistsInCart = (cartProducts:any) => {
    let addedProduct
    if(cartProducts.length > 0){
        cartProducts.map((product:any) => {
            if(product.productId == params.product){
                addedProduct = product
            }
        })
    }
    return addedProduct
}

const fetchCartProducts = async() => {
    const fetchCartResponse = await axiosInstance.post('/cart/fetch-cart',{userId: "12345"})
    if(fetchCartResponse.data.success){
        let addedProductDetails:any = checkIfProductExistsInCart(fetchCartResponse.data.data)
        if(addedProductDetails){
            setIsAddedToCart(true)
            setQuantity(addedProductDetails.quantity)
        }
    }
}

const handleUpdateCart = async(operation:any) => {
    let tempQuantity = quantity
    if(operation == "decrease"){
        if(quantity>1)
        tempQuantity--
    }else if (operation == "increase"){
        tempQuantity++
    }
    const updateCartResponse = await axiosInstance.post('/cart/update-product',{
        userId: "12345",
        id:params.product,
        quantity: tempQuantity
    })
    if(updateCartResponse.data.success){
        setQuantity(tempQuantity)
    }

    
}

const handleDeleteCart = async() => {
    const removeCartResponse = await axiosInstance.post('/cart/delete-product',{
        userId: "12345",
        productId:params.product
    })
    if(removeCartResponse.data.success){
        setIsAddedToCart(false)
        setQuantity(0)
    }
}

return(

    <div className="product-container">
        <div className="title">
            <h1> Product Specific Details </h1>
        </div>
        <div className="product">
            <div className="product-card"> 
                <img className="image" src={productdetails?.url}  />
                <div className="description">
                    <h3>  {productdetails?.title.toUpperCase()} </h3>
                    <h3> Description </h3>
                    <p>{productdetails?.description.toLocaleLowerCase()}</p>
                    <h3 className="font-bold">  Price </h3>
                    <p>{productdetails?.price}</p>

                    <h3 className="font-bold"> Rating </h3>
                    <p>{productdetails?.ratings}</p>

                    <h3 className="font-bold"> Review </h3>
                    <p>{productdetails?.reviews}</p>



                    {isAddedToCart && (
                        <>
                            <button onClick={()=> handleUpdateCart("decrease")} className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded">-</button>
                            <p>{quantity}</p>
                            <button onClick={()=>handleUpdateCart("increase")} className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded">+</button>
                        </>
                    )}
                    {isAddedToCart
                        ? <p onClick={handleDeleteCart} className="cursor-pointer text-red-500 hover:text-red-700">Delete from cart</p>
                        : <button onClick={handleAddCart} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">Add to cart</button>}

                </div>
                
             </div>
        </div>
        
    </div>

    



)


}