export const PROFILE_COLUMNS = 'id, email, username, avatar_url'

export const CODE_COLUMNS = 'id, code, author(email, username, avatar_url), company, title, description, language'
export const COMPANY_COLUMNS = `id, name, description, url, logo, codes(${CODE_COLUMNS})`

type BannedReason = 'email' | 'banned' | 'spam'

interface BannedCode {
  code: string
  reason: BannedReason
}

export const BANNED_CODES: BannedCode[] = [
  { reason: 'email', code: '@gmail' },
  { reason: 'email', code: '@hotmail' },
  { reason: 'email', code: '@live' },
  { reason: 'banned', code: 'aklamio' },
  { reason: 'banned', code: 'aklam.io' },
  { reason: 'banned', code: 'anon.to' },
  { reason: 'banned', code: 'amzn.to' },
  { reason: 'banned', code: 'abcc.com' },
  { reason: 'banned', code: 'acorns.com' },
  { reason: 'banned', code: 'app.fulltip.com' },
  { reason: 'banned', code: 'avive.world' },
  { reason: 'banned', code: 'banks-money.me' },
  { reason: 'banned', code: 'binance.com' },
  { reason: 'banned', code: 'bitmart.com' },
  { reason: 'banned', code: 'betfury.io' },
  { reason: 'banned', code: 'cryptobreaking.com' },
  { reason: 'banned', code: 'kucoin.com' },
  { reason: 'banned', code: 'coinsmart.com' },
  { reason: 'banned', code: 'cryptofy.ca' },
  { reason: 'banned', code: 'csgocases.com' },
  { reason: 'banned', code: 'cb.run' },
  { reason: 'banned', code: 'emberfund' },
  { reason: 'banned', code: 'get-bonus.eu' },
  { reason: 'banned', code: 'fiverr.com' },
  { reason: 'banned', code: 'freebitco.in' },
  { reason: 'banned', code: 'freecash.com' },
  { reason: 'banned', code: 'imp.i246982.net' },
  { reason: 'banned', code: 'instant-gaming.com' },
  { reason: 'banned', code: 'leadstar.pl' },
  { reason: 'banned', code: 'ref.trade.re' },
  { reason: 'banned', code: 'referallcodes.com' },
  { reason: 'banned', code: 'smrturl.co' },
  { reason: 'banned', code: 's1.banks-money.me' },
  { reason: 'banned', code: 'surl.li' },
  { reason: 'banned', code: 't.me' },
  { reason: 'banned', code: 'vivid.money' },
  { reason: 'banned', code: 'goo.su' },
  { reason: 'banned', code: 's.id' },
  { reason: 'banned', code: '1r1.pl' },
  { reason: 'banned', code: 'turk-toplist.tr' },
  { reason: 'banned', code: 'globoface.com' },
  { reason: 'banned', code: 'rollercoin.com' },
  { reason: 'banned', code: 'aliexpress.com' },
  { reason: 'banned', code: 'quidco' },
  { reason: 'banned', code: 'questler.de' },
  { reason: 'banned', code: 'yazing.com' },
  { reason: 'banned', code: 'instant-gaming.com' },
  { reason: 'banned', code: 'www.bitmart.com' },
  { reason: 'banned', code: 'py.pl' },
]
