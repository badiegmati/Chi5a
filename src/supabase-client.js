
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://qleihushscutaikgeaeg.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFsZWlodXNoc2N1dGFpa2dlYWVnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTM4OTY2MjEsImV4cCI6MjA2OTQ3MjYyMX0.UMBOZ2EXOeOmhbUgzd1doUnqbvlexlLOtCPorT5N1cc'
const supabase = createClient(supabaseUrl, supabaseKey)
export default supabase ;