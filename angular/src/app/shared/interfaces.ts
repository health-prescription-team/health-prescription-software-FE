export interface Medicine{
  "id": string,
  "name": string,
  "price": number,
  "medicineCompany": string,
  "medicineImageBytes": string
}

export interface CatalogInterface{
  medicines:Medicine[],
  medicinesCount:number
}

export interface Profile {
  "patientNames": string,
  "patientEGN": string,
  "profileImage": string
  "patientPrescriptions":string
}
export interface ProfilePrescription {
  "prescriptionId": string,
  "createdAt": string,
  "expiresAt": string,
  "isFulfilled": boolean,
  "medicaments": string[]
}


export interface PrescriptionDetails{
  "gpFullName": string,
  "gpEgn": string,
  "patientEgn": string,
  "age": number,
  "diagnosis": string,
  "isFulfilled": boolean,
  "fulfillmentDate": string,
  "createdAt": string,
  "expiresAt": string,
  "prescriptionDetails": PrescriptionMedicament[]
}


export interface PrescriptionMedicament{
  "medicineId": string,
  "id": string,
  "medicineName": string,
  "notes": string,
  "eveningDose": number,
  "lunchTimeDose": number,
  "morningDose": number,
  "measurementUnit": string
}


export interface MedicamentCatalogDetails{
  name: string,
  medicineImageBytes: string,
  price: number,
  medicineCompany: string,
  medicineDetails: string,
  ingredients: string,
  pharmacyName: string,
  pharmacyId: string,
  imageFileName:string
}

export interface DynamicSearchMedicament{
  "id": string,
  "name": string
}
export interface CurrentMedicine{
  med: string,
  morning:number,
  midday: number,
  evening: number,
  additionalInfo: number,
}




export interface Me{
  "id": string,
}
export interface ChatMessage{

  "id": string,
  "message": string,
  "messageTime": string,
  "authorId": string,
  "recipientId": string,
  "isRead": boolean

}
