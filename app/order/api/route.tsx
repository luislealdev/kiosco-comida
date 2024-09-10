import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../src/lib/prisma';

export async function GET() {
    const orders = await prisma.product.findMany({
        take: 5,
    })
    return Response.json(orders)
}


export async function POST(req: NextRequest) {
    console.log("RECIEVED REQUEST");
    
    try {
        const data = await req.json();
        console.log(data);
        
        await prisma.order.create({
            data: {
                name: data.name,
                total: data.total,
                orderProducts: {
                    create: data.order.map((product: { id: number, quantity: number }) => ({
                        productId: product.id,
                        quantity: product.quantity
                    }))
                }
            }
        });
        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error creating order:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}


