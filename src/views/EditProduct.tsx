import { Link, Form, useActionData, ActionFunctionArgs, redirect, LoaderFunctionArgs, useLoaderData } from "react-router-dom"
import ErrorMessage from "../components/ErrorMessage"
import {  getProductById, updateProduct } from "../services/ProductService"
import { Product } from "../types"
import ProductForm from "../components/ProductForm"

export async function loader({params} : LoaderFunctionArgs) {
  
  if(params.id !== undefined){
    const product = await getProductById(+params.id)
    if(!product) {
      return redirect('/')
    }
    return product
  }
}

//process data from formulary
export async function action({request, params} : ActionFunctionArgs) {
  const data = Object.fromEntries(await request.formData()) //always in this function you have to return one value 
   
  let error = ''
  if(Object.values(data).includes('')){
    error = 'Todos lo campos son obligatirios'
  }
  if(error.length){
    return error
  }
  if(params.id !== undefined){
    await updateProduct(data, +params.id)

    //If the previous validation passes, I call addProduct. We validate in ProductService, communicate with the API, and if everything is inserted correctly, we redirect
    return redirect('/')
  }
  
}
const availabilityOptions = [
  { name: 'Disponible', value: true},
  { name: 'No Disponible', value: false}
]

export default function EditProduct() {
  const product = useLoaderData() as Product
  const error = useActionData() as string 
  
  return (
    <>
      <div className="flex justify-between">
        <h2 className="text-3xl font-black text-slate-500">Editar Producto</h2>
        <Link
            to="/"
            className='rounded-md p-3 bg-indigo-500 text-sm font-bold text-white shadow-md hover:bg-indigo-700'
        >
          Volver a Productos
        </Link>
      </div>

      {error && <ErrorMessage>{error}</ErrorMessage> }
      
      <Form
        className="mt-10"   
        method="POST"
      >
 
        <ProductForm
          product={product}
        />

        <div className="mb-4">
          <label
            className="text-gray-800"
            htmlFor="availability"
          >Disponibilidad:</label>
          <select 
            id="availability"
            className="mt-2 block w-full p-3 bg-gray-50"
            name="availability"
            defaultValue={product?.availability.toString()}
          >
            {availabilityOptions.map(option => (
              <option key={option.name} value={option.value.toString()}>{option.name}</option>
            ))}
          </select>
        </div>

        <input
          type="submit"
          className="mt-5 w-full bg-indigo-600 p-2 text-white font-bold text-lg cursor-pointer rounded"
          value="Guardar Cambios"
        />
      </Form>

    </>
  )
}
