'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import {  Mail, Loader2 } from 'lucide-react'
import { FaTelegram } from 'react-icons/fa6'
import { Link } from 'react-router-dom'

export default function Component() {
  const [isRedirecting, setIsRedirecting] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    setIsMobile(window.innerWidth <= 768)
    window.addEventListener('resize', () => setIsMobile(window.innerWidth <= 768))
    return () => window.removeEventListener('resize', () => setIsMobile(window.innerWidth <= 768))
  }, [])

  const handleContactClick = () => {
    setIsRedirecting(true)
    // Simulate checking for Telegram installation
    setTimeout(() => {
        window.location.href = 'https://t.me/YourTelegramChannel'
    }, 1500)
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-background text-foreground">
      <Card className="w-full max-w-lg bg-card text-card-foreground border-primary-muted shadow-lg overflow-hidden">
        <CardContent className="p-6 space-y-4">
          <h1 className="text-3xl font-bold text-center mb-8">
            No Registered Account ?
          </h1>
          <div className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-phover rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt"></div>
            <Button 
              onClick={handleContactClick}
              className="relative w-full py-6 text-lg bg-primary hover:bg-phover transition-all duration-300 rounded-lg shadow-md hover:shadow-lg transform hover:-translate-y-1"
              disabled={isRedirecting}
            >
              {isRedirecting ? (
                <Loader2 className="mr-2 h-6 w-6 animate-spin" />
              ) : (
                <FaTelegram className="mr-2 h-6 w-6 group-hover:rotate-12 transition-transform duration-300" />
              )}
              {isRedirecting ? 'Connecting...' : 'Contact us on Telegram'}
            </Button>
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