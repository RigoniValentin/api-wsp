import { createBot, createFlow, MemoryDB, createProvider, addKeyword } from '@bot-whatsapp/bot'
import { BaileysProvider, handleCtx } from '@bot-whatsapp/provider-baileys'


const florGenerico = addKeyword('.*').addAnswer('Este chat es solo para *notificaciones* de tu sistema Río Gestión.\n\nPara contactar con soporte debe iniciar una *solicitud de atención* mediante la funcionalidad de *"Contactar con soporte"* ubicada en la esquina inferior derecha del sistema.\n\n*Gracias!!*');


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
        flow: createFlow([florGenerico]),
        database: new MemoryDB(),
        provider
    })

}

main()