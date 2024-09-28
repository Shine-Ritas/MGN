import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from "@/components/ui/separator"
import useQuery from '@/hooks/useQuery';

type AnaylysisData = {
  label: string,
  value: string
}

export default function Component({ slug } : {slug :string}) {
  const analysisData = [
    { label: "Total Chapters", value: "100" },
    { label: "Completed Chapters", value: "75" },
    { label: "In Progress", value: "20" },
    { label: "Not Started", value: "5" },
  ]

  const { data , isLoading,  } = useQuery(`admin/mogous/${slug}/analysis`);

  if(isLoading)
  {
    return ;
  }

  return (
    <Card className="bg-background w-full max-w-3xl">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg font-semibold">Analysis</CardTitle>
      </CardHeader>
      <Separator />
      <CardContent className="px-0 py-4">
        <div className="flex">
          <div className="w-4/5 px-6">
            {data['chapter_analysis'].map((item: AnaylysisData,index : number) => (
              <div key={index} className="py-3">
                <h3 className="text-sm font-medium">{item.label}</h3>
                {index < analysisData.length - 1 && <Separator className="mt-3" />}
              </div>
            ))}
          </div>
          <div className="w-1/5 border-l">
            {data['chapter_analysis'].map((item : AnaylysisData, index :number) => (
              <div key={index} className="py-3 px-4">
                <p className="text-sm font-semibold text-right">{item.value}</p>
                {index < analysisData.length - 1 && <Separator className="mt-3" />}
              </div>
            ))}
          </div>
        </div>
      </CardContent>
      <CardFooter className="justify-between border-t p-4">
        <p className="text-sm text-muted-foreground">Last updated: 2 hours ago</p>
        <button className="text-sm  hover:underline">View Details</button>
      </CardFooter>
    </Card>
  )
}