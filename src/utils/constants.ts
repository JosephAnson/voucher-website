export const PROFILE_COLUMNS = 'id, email, username, avatar_url'

export const CODE_COLUMNS = 'id, code, author(email, username, avatar_url), company, title, description'
export const COMPANY_COLUMNS = `id, name, description, url, logo, codes(${CODE_COLUMNS})`
