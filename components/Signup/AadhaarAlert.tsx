interface Identity {
	aadhaar: string;
	onChangeHandler: (aadhaarNumber: string) => void;
	verify: () => void;
}

export default function AadhaarAlert({
	aadhaar,
	onChangeHandler,
	verify,
}: Identity) {
	return (
		<div>
			<input
				placeholder='Aadhaar Number'
				value={aadhaar}
				onChange={e => onChangeHandler(e.target.value)}
			/>
			<button onClick={verify}>Verify User</button>
		</div>
	);
}
