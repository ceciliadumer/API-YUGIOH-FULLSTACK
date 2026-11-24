import { NextResponse } from "next/server";
import cartaController from "../../../src/controller/carta.routes.controller";

export async function GET() {
    try {
        const cartas = await cartaController.listarCartas();

        return NextResponse.json(cartas);
    } catch (error) {
        return NextResponse.json(
            { erro: "Erro ao buscar cartas" },
            { status: 500 }
        );
    }
}