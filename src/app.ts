import { createBot, createFlow, MemoryDB, createProvider, addKeyword } from '@bot-whatsapp/bot'
import { BaileysProvider, handleCtx } from '@bot-whatsapp/provider-baileys'


const flowBienvenida = addKeyword('hola').addAnswer('Bienvenido al chat de soporte de Río Gestión!! ¿En qué puedo ayudarte?')


const main = async () => {

    const provider = createProvider(BaileysProvider)

    provider.initHttpServer(3010)

    provider.http.server.post('/send-message', handleCtx(async (bot, req, res) => {
        const body = req.body
        const numero = body.numero
        const mensaje = body.mensaje
        await bot.sendMessage(numero, mensaje, {})
        res.end('Respeusta Ok.')
    }))

    await createBot({
        flow: createFlow([flowBienvenida]),
        database: new MemoryDB(),
        provider
    })

}

main()