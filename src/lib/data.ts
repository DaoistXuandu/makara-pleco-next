import { createClient } from '@supabase/supabase-js'
import { stat } from 'fs'

async function initialGet() {
    const supabase = await createClient(process.env.NEXT_PUBLIC_URL as string, process.env.NEXT_PUBLIC_KEY as string)
    const { data, error } = await supabase
        .from('Initial')
        .select()
        .eq("id", 1)

    return data
}

async function gcsGetDesc() {
    const supabase = await createClient(process.env.NEXT_PUBLIC_URL as string, process.env.NEXT_PUBLIC_KEY as string)
    const { data, error } = await supabase
        .from('GCS')
        .select()
        .order('id', { ascending: false })
        .limit(1)

    return data
}


async function gcsGetDescPrev() {
    const supabase = await createClient(process.env.NEXT_PUBLIC_URL as string, process.env.NEXT_PUBLIC_KEY as string)
    const { data, error } = await supabase
        .from('GCS')
        .select()
        .order('id', { ascending: false })
        .limit(2)

    return data
}

async function gcsDelete() {
    const supabase = await createClient(process.env.NEXT_PUBLIC_URL as string, process.env.NEXT_PUBLIC_KEY as string)
    const response = await supabase
        .from('GCS')
        .delete()
        .in('track', ["A1", "E0", "A", "B", null])

    return response
}

async function getImage(id: number) {
    const supabase = await createClient(process.env.NEXT_PUBLIC_URL as string, process.env.NEXT_PUBLIC_KEY as string)
    const { data, error } = await supabase
        .from('Image')
        .select()
        .order('id', { ascending: (id == 1) })
        .limit(1)

    return data
}


export { initialGet, gcsDelete, gcsGetDesc, getImage, gcsGetDescPrev }