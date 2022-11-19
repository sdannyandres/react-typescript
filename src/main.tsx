import ReactDom from 'react-dom/client';
import { QueryClientProvider, QueryClient, useQuery } from 'react-query'
const root = document.getElementById('root') as HTMLElement

interface IAppProps {
  id:number
}

const App: React.FC<IAppProps> = ({id}) => {
  const {isLoading, data} = useQuery(["post"], async () => {
    const datos = await (await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)).json()
    return datos
  })

if (isLoading) return <p>Esta cargando</p>
return <div> {JSON.stringify(data)} </div>
}

const queryClient = new QueryClient()

ReactDom.createRoot(root).render(
  <QueryClientProvider client={queryClient}>
    <App id={10} />
    </QueryClientProvider>

  )