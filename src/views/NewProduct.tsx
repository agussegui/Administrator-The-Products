import { Link, Form, useActionData, ActionFunctionArgs, redirect } from "react-router-dom"
import ErrorMessage from "../components/ErrorMessage"
import { addProduct } from "../services/ProductService"
import ProductForm from "../components/ProductForm"

//process data from formulary
export async function action({request} : ActionFunctionArgs) {
  const data = Object.fromEntries(await request.formData()) //always in this function you have to return one value 
   
  let error = ''
  if(Object.values(data).includes('')){
    error = 'Todos lo campos son obligatirios'
  }
  if(error.length){
    return error
  }

  await addProduct(data)

  //If the previous validation passes, I call addProduct. We validate in ProductService, communicate with the API, and if everything is inserted correctly, we redirect
  return redirect('/')
  
}

export default function NewProduct() {

  const error = useActionData() as string 
  console.log(error)

  return (
    <>
      <div className="flex justify-between">
        <h2 className="text-3xl font-black text-slate-500">Registrar Producto</h2>
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
        
        />

        <input
          type="submit"
          className="mt-5 w-full bg-indigo-600 p-2 text-white font-bold text-lg cursor-pointer rounded"
          value="Registrar Producto"
        />
      </Form>

    </>
  )
}
