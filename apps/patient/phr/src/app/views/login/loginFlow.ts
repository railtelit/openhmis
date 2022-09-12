

export interface LoginRule{
        step:string,
        fields:string[]
}
export const LoginFlow={
        mobile:{
            rule:[            
                        {step:'initValue',}                
            ]
        }
}