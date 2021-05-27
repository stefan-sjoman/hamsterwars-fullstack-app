import './error-comp.css';

const ErrorComp = () => {
	return (
		<section className="error-comp">
			<p className="db-error">Tyvärr kunde in hamstarna hämtas från databasen. Försök igen senare eller testa ladda om sidan direkt.
			</p>
			<button className="basic-btn" onClick={() => window.location.reload()}> {/* Kör om hämtningen... INTE RELOAD */}
				LADDA OM
			</button>
		</section>
	);
}

export default ErrorComp;