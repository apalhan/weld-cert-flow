
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { Resend } from "npm:resend@2.0.0"

const resend = new Resend(Deno.env.get("RESEND_API_KEY"))

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface EmailData {
  traineeName: string
  traineeEmail: string
  certificationType: string
  completionDate: string
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const requestData = await req.json()
    const { traineeName, traineeEmail, certificationType, completionDate }: EmailData = requestData

    // Log the data received to help with debugging
    console.log("Email data received:", { traineeName, traineeEmail, certificationType, completionDate })

    // Validate required fields
    if (!traineeName || !traineeEmail) {
      console.error("Missing required fields:", { traineeName, traineeEmail })
      throw new Error("Missing required fields: traineeName and traineeEmail are required")
    }

    const emailResponse = await resend.emails.send({
      from: "Certification System <onboarding@resend.dev>",
      to: [traineeEmail],
      subject: "Certification Process Completed",
      html: `
        <h1>Certification Process Completed</h1>
        <p>Dear ${traineeName},</p>
        <p>Congratulations! You have successfully completed the ${certificationType} certification process on ${completionDate}.</p>
        <p>Please keep this email for your records.</p>
        <p>Best regards,<br>The Certification Team</p>
      `
    })

    console.log("Email sent successfully:", emailResponse)

    return new Response(JSON.stringify(emailResponse), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    })
  } catch (error) {
    console.error("Error sending certification email:", error)
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    })
  }
})
