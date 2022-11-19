import ReactDom from 'react-dom/client';
import { useState, useEffect,useCallback, memo } from 'react';
interface IRegistro {
  id: string;
  nombre: string
}

var root = document.getElementById('root') as HTMLElement

interface IItemProps {
  item: IRegistro
  deleteRegistro: (id: string) => void
}
const Item: React.FC<IItemProps> = memo(({ item, deleteRegistro}) =>{
useEffect(() => {
  console.log('item', item)
})

return <li>{ item.id } { item.nombre } <button onClick={() => deleteRegistro(item.id)}>delete</button></li> 
})


interface IListaProps {
  registros: IRegistro[]
  deleteRegistro: (id: string) => void
}

const Lista: React.FC<IListaProps> = memo(({ deleteRegistro,registros }) => {
  useEffect(()=> {
    console.log('lista')
  })
  return <ul>
    {
      registros.map((item: IRegistro, index: number) =>
        <Item key ={ index } deleteRegistro={deleteRegistro} item = { item } > </Item>
      )
    }
    < /ul>
})

const valoresIniciales: IRegistro[] = [
  {
    id: "1",

    nombre: "producto 2",
  },
  {
    id: "2",

    nombre:"producto 2",
  }
]
const App = () => {
  const [texto, setTexto] = useState("")
  const [productos,setProductos] = useState<IRegistro[]>(valoresIniciales)
  useEffect(() => {
    console.log('app')
})
const addRegistro = () => {
  const nuevo: IRegistro = {
    id: new Date().getTime().toString(),
    nombre: texto
  }
  setProductos([...productos, nuevo])
  
 
}
const deleteRegistro= useCallback((id: string) => {
  setProductos (productos.filter(item => item.id != id))
},[productos])

return <div>
  <input type="text" value={texto} onChange={ (e) => setTexto(e.target.value)
    } />
    <button onClick={ () => addRegistro() }>ADD</button>
    <Lista registros={productos} deleteRegistro={deleteRegistro}/>
    </div>
    }

ReactDom.createRoot(root).render(
  <App />
)
    
 
