import prisma from '../../../lib/prisma'
export default async function handler(req, res) {
  const setting = await prisma.setting.findUnique({ where: { key: 'payments_enabled' } })
  res.json({ payments_enabled: setting?.value ?? 'false' })
}
