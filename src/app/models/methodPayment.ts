export interface MethodPayment {
    id: number;
    number_card: string;
    name_card: string;
    expiration_date_card: any;
    cvv_card: any;
    type: 'yape' | 'tarjeta';
    status_card: string;
    nombre_titular: string;
    numero_celular: string;
    numero_documento: string;
    user_id: number;
}
