import db from '@/lib/db';
import bcrypt from 'bcrypt';
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
    try{
        const data = await request.json();
        const { name, email, password } = data;

        const existingEmail = await db.user.findUnique({
            where : { email: email}
        });
        if(existingEmail){
            return NextResponse.json({user: null,message: 'This email already exists.'},{status: 409})
        }

        const existingName = await db.user.findFirst({
            where : {name: name}
        });
        if(existingName){
            return NextResponse.json({user: null,message: 'This name already exists.'},{status: 409})
        }
        const hashPassword = await bcrypt.hash(password, 10);
        const newUser = await db.user.create({
            data: {
                name: name,
                email: email,
                password: hashPassword
            }
        })

        const { password: newUserPassword, ...rest} = newUser;
        return NextResponse.json({ user: rest, message: 'User created successfully.' },{status: 201})
    }catch{
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
    }
}