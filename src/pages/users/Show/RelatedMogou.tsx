import { Card, CardContent, CardTitle } from "@/components/ui/card"
import useQuery from "@/hooks/useQuery";
import { Link } from "react-router-dom";


interface RelatedMogouProps {
  slug : string 
}

const RelatedMogou = ({slug} : RelatedMogouProps) => {

  const { data: relatedMogous, isLoading } = useQuery(`users/mogous/${slug}/related`);


  return (
    <Card className="w-full py-8 px-4">
        
        <CardTitle className="text-lg" >
            You may also like
        </CardTitle>

        {
          (!isLoading ) && (
            <CardContent 
            className="grid grid-cols-1 gap-4 mt-8"
            >
              {
                relatedMogous?.mogous?.map((mogou : any)=>{
                  return (
                    <Link
                    to={`/show/${mogou.slug}`}
                    key={mogou.id} className="flex items-center gap-4">
                      <img src={mogou.cover} alt={mogou.title} className="w-20  object-cover rounded-md" />
                      <div>
                        <h4 className="text-md font-semibold">{mogou.title}</h4>
                        <p className="text-sm text-muted-foreground">{mogou.author}</p>
                      </div>
                    </Link>
                  )
                })
              }
          </CardContent>
          )
        }

    </Card>
  )
}

export default RelatedMogou