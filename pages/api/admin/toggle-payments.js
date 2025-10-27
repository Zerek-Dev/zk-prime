import prisma from '../../../lib/prisma'

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end()
  const { enabled } = req.body
  await prisma.setting.upsert({
    where: { key: 'payments_enabled' },
    update: { value: enabled ? 'true' : 'false' },
    create: { key: 'payments_enabled', value: enabled ? 'true' : 'false' }
  })
  res.json({ ok: true })
}
