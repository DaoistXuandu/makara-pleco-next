import { copyFileSync } from "fs"
import { createClient } from '@supabase/supabase-js'

async function gcsGet() {
    const supabase = createClient(process.env.NEXT_PUBLIC_URL as string, process.env.NEXT_PUBLIC_KEY as string)
    const { data, error } = await supabase
        .from('GCS')
        .select()
    return data
}

export { gcsGet }