export interface SendData{
	guestName:string;		//客户名称
	status:number;			//状态
	guestFrom:number;		//获客途径
	appId:string;			//渠道ID
	serviceMan:string;		//客服经理
	companyType:number;
	foundTime:string;
	registerCapital:number;
	licenceNum:number;
	linkName:string;
	linkMobile:number;
	linkJob:string;
	companyAddress:string;
	guestId?:number
	remark?:string
	
	
}