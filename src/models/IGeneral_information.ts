export interface User {
	id: number;
	second_name_ru: string;
	name_ru: string;
	second_name_en: string;
	name_en: string;
	birthday: string;
	phone: string;
	telegram: string;
	address?: any;
	created_at: Date;
	updated_at: Date;
	deleted_at?: any;
	user_id: number;
	city_id: number;
	dealer_service: number;
	office_id?: number;
	type_level_id?: number;
}

export interface TransportFuel {
	id: number;
	name: string;
	code: string;
	created_at: Date;
	updated_at: Date;
	deleted_at?: any;
}

export interface TransportDrive {
	id: number;
	name: string;
	code: string;
	created_at: Date;
	updated_at: Date;
	deleted_at?: any;
}

export interface TransportTransmission {
	id: number;
	name: string;
	code: string;
	created_at: Date;
	updated_at: Date;
	deleted_at?: any;
}

export interface TransportHighlight {
	id: number;
	name: string;
	code: string;
	created_at: Date;
	updated_at: Date;
	deleted_at?: any;
}

export interface StatusOrder {
	id: number;
	title: string;
	code: string;
	created_at: Date;
	updated_at: Date;
	deleted_at?: any;
}

export interface StatusShipping {
	id: number;
	title: string;
	code: string;
	created_at: Date;
	updated_at: Date;
	deleted_at?: any;
}

export interface StatusFinance {
	id: number;
	title: string;
	code: string;
	created_at: Date;
	updated_at: Date;
	deleted_at?: any;
}

export interface Auction {
	id: number;
	name: string;
	code: string;
	created_at: Date;
	updated_at: Date;
	deleted_at?: any;
}

export interface Location {
	id: number;
	name: string;
	created_at: Date;
	updated_at: Date;
	deleted_at?: any;
	auction_id: number;
	xml_id: number;
	full_name: string;
	copart_name: string;
}

export interface Port {
	id: number;
	xml_id: number;
	name: string;
	code: string;
	created_at: Date;
	updated_at: Date;
	deleted_at?: any;
}

export interface Destination {
	id: number;
	title: string;
	code: string;
	created_at: Date;
	updated_at: Date;
	deleted_at?: any;
}

export interface TransportType {
	id: number;
	name: string;
	code: string;
	created_at: Date;
	updated_at: Date;
	deleted_at?: any;
}

export interface TransportSize {
	id: number;
	name: string;
	code: string;
	created_at: Date;
	updated_at: Date;
	deleted_at?: any;
	transport_type_id: number;
	additional_info: string;
	transport_type: TransportType;
}

export interface TransportType2 {
	id: number;
	name: string;
	code: string;
	created_at: Date;
	updated_at: Date;
	deleted_at?: any;
}

export interface DocFee {
	id: number;
	title: string;
	price: string;
	description: string;
	color: string;
	additional: string;
	created_at?: any;
	updated_at: Date;
	deleted_at?: any;
	carrier_id: number;
}

export interface BuyerRole {
	id: number;
	title: string;
	code: string;
	created_at: Date;
	updated_at: Date;
	deleted_at?: any;
}

export interface BuyerUser {
	id: number;
	email: string;
	active: number;
	email_verified_at?: any;
	created_at: Date;
	updated_at: Date;
	deleted_at?: any;
	user_role_id: number;
}

export interface Credential {
	id: number;
	login: string;
	buyerCode: string;
	password: string;
	created_at: Date;
	updated_at: Date;
	deleted_at?: any;
	auction_id: number;
	company_name?: any;
	country_id: number;
}

export interface SeaLine {
	id: number;
	title: string;
	code: string;
	created_at: Date;
	updated_at: Date;
	deleted_at?: any;
	url: string;
}

export interface ShippingInformation {
	id: number;
	arrival_warehouse?: any;
	documents_received: number;
	number_container: string;
	date_arrival?: any;
	date_city: string;
	date_pay?: any;
	created_at: Date;
	updated_at: Date;
	deleted_at?: any;
	sea_line_id: number;
	general_information_id: number;
	sea_line: SeaLine;
}

export interface SeaLine2 {
	id: number;
	title: string;
	code: string;
	created_at: Date;
	updated_at: Date;
	deleted_at?: any;
	url: string;
}

export interface PaymentInformation {
	id: number;
	payment_by: number;
	payment_type: number;
	transfer_bank?: any;
	buyed_price: number;
	buyed_price_date: string;
	confirm_price?: number;
	confirm_price_date: string;
	cash_account_id: number;
	cash_account_type: string;
	file: string;
	status: number;
	comment: string;
	created_at: Date;
	updated_at: Date;
	deleted_at?: any;
	general_information_id: number;
	customer_information_id: number;
}

export interface FinanceInformation {
	id: number;
	usa_finance: string;
	ag_finance: string;
	usa_price: number;
	ag_price: number;
	created_at: Date;
	updated_at: Date;
	deleted_at?: any;
	carrier_id: number;
	general_information_id: number;
	cash_account_carrier_id: number;
}

export interface ImageInformation {
	id: number;
	image_name: string;
	image_path: string;
	created_at: Date;
	updated_at: Date;
	deleted_at?: any;
	general_information_id: number;
}

export interface GeneralInformation {
	user: User[];
	id: number;
	year: number;
	engine: string;
	odometer: string;
	keys: number;
	equipment: string;
	transportFuel: TransportFuel;
	transportDrive: TransportDrive;
	transportTransmission: TransportTransmission;
	transportHighlight: TransportHighlight;
	start_price: string;
	step_price: string;
	status_order: StatusOrder;
	status_shipping: StatusShipping;
	status_finance: StatusFinance;
	auction: Auction;
	lot: string;
	location: Location;
	port: Port;
	outside: number;
	destination: Destination;
	transport_size: TransportSize;
	transport_type: TransportType2;
	transport_name: string;
	vin: string;
	doc_fee: DocFee;
	price: number;
	cost_price: string;
	min_price: string;
	now_price: string;
	buyer_role: BuyerRole;
	buyer_user: BuyerUser;
	credential: Credential;
	shippingInformation: ShippingInformation;
	seaLine: SeaLine2;
	created_at: Date;
	updated_at: Date;
	paymentInformation: PaymentInformation[];
	financeInformation: FinanceInformation;
	imageInformation: ImageInformation[];
}

export interface Pagination {
	total_results: number;
	page: number;
	prev_page?: any;
	next_page?: any;
}

export interface RootObject {
	general_information: GeneralInformation[];
}
