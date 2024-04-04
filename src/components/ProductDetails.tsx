import { useNavigate, Form, ActionFunctionArgs, redirect, useFetcher } from "react-router-dom"
import { Product } from "../types"
import { formatCurrency } from "../utils"
import { deleteProduct } from "../services/ProductService"

type ProductDetailsProps = {
    product: Product
}

export async function action({params} : ActionFunctionArgs) {
    if(params.id !== undefined){
        await deleteProduct(+params.id)

        return redirect('/')
    }
}

export default function ProductDetails({product} : ProductDetailsProps) {
    
    const fetcher = useFetcher()
    const navigate = useNavigate()
    const isVailable = product.availability
    return (
        
        <tr className="border-b">
            <td className="p-3 text-lg text-gray-800 font-bold">
                {product.name}
            </td>
            <td className="p-3 text-lg text-gray-800 font-bold">
                {formatCurrency(product.price)}
            </td>
            <td className="p-3 text-lg text-gray-800 font-bold">
                <fetcher.Form method="POST">
                    <button
                        type="submit"
                        name="id"
                        value={product.id}
                        className={`${isVailable ? 'text-black' : 'text-red-500'}
                        rounded-lg p-2 text-xs uppercase font-bold w-full border border-black-100 hover:cursor-pointer`}
                    >
                        {isVailable ? 'Disponible' : 'No Disponible'}
                    </button>
                </fetcher.Form>

                
            </td>
            <td className="p-3 text-lg text-gray-800 font-bold">
                <div className="flex gap-2 items-center">
                    <button
                        onClick={() => navigate(`/productos/${product.id}/editar`)}
                        className="bg-indigo-600 text-white rounded-lg w-full uppercase p-2 text-center font-bold text-md"
                    >
                        Editar
                    </button>

                    <Form
                        className="w-full"
                        method="POST"
                        action={`productos/${product.id}/eliminar`}
                        onSubmit={(e)=> {
                            if(!confirm('¿Eliminar?')) {
                                e.preventDefault();
                            }
                        }}      
                    >
                        <input
                            type='submit'
                            value='Eliminar'
                            className="bg-red-600 text-white rounded-lg w-full uppercase p-2 text-center font-bold text-md"
                        />
                    </Form>
                </div>
            </td>
        </tr> 
        
    )
}
