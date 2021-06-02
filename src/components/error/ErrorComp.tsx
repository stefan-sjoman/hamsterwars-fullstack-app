import './error-comp.css';

interface Props {
	runUseEffect:any
	setRunUseEffect:any
} 

const ErrorComp = ({runUseEffect, setRunUseEffect}:Props) => {
	return (
		<section className="error-comp">
			<p className="db-error">Tyvärr kunde in hamstarna hämtas från databasen. Försök igen senare eller testa ladda om sidan direkt.
			</p>
			<button className="basic-btn" onClick={() => setRunUseEffect(!runUseEffect)}>
				LADDA OM
			</button>
		</section>
	);
}

export default ErrorComp;