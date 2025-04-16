
import { useState, useEffect } from 'react'
import { Card, CardContent } from "@/components/ui/card"
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import {  Mail } from 'lucide-react'
import { Link } from 'react-router-dom'
import useQuery from '@/hooks/useQuery'
import ContactUsSocial from './ContactUsSocial'

export default function Component() {
  const [isMobile, setIsMobile] = useState(false)
  const { data: socialLinks, isLoading} = useQuery('users/contact-us');
  
  useEffect(() => {
    setIsMobile(window.innerWidth <= 768)
    window.addEventListener('resize', () => setIsMobile(window.innerWidth <= 768))
    return () => window.removeEventListener('resize', () => setIsMobile(window.innerWidth <= 768))
  }, [isMobile])

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 text-foreground">
      <Card className="w-full max-w-lg bg-card text-card-foreground overflow-hidden">
        <CardContent className="p-6 space-y-2 ">
          <h1 className="text-2xl font-bold text-center mb-6">
            No Registered Account ?
          </h1>
          <div className="space-y-3 flex flex-col items-center pb-3">
            {
              !isLoading && socialLinks?.data?.map((socialLink)=>(
                  <ContactUsSocial 
                  key={socialLink?.id}
                  socialLink={socialLink} />
              ))
            }
          </div>
          <p className="text-sm text-foreground/60 text-center">
            We typically respond within 24 hours. 
            <br />
           <span className='text-muted-foreground text-xs '>
           Already Have Account ? <Link to="/login" className="underline">Login Here</Link>
           </span>
          </p>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <a 
                  href="mailto:support@example.com" 
                  className="text-sm text-muted-foreground transition-colors duration-300 flex items-center justify-center"
                >
                  <Mail className="mr-2 h-4 w-4" />
                  Can't access Telegram?
                </a>
              </TooltipTrigger>
              <TooltipContent>
                <p>Email support available. Response within 48 hours.</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </CardContent>
      </Card>

    </div>
  )
}