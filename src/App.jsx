import { useState } from 'react'
import calculatorIcon from './assets/images/icon-calculator.svg'
import illustration from './assets/images/illustration-empty.svg'

function App() {
  const [amount, setAmount] = useState('');
  const [term, setTerm] = useState('');
  const [interestRate, setInterestRate] = useState('');
  const [mortgageType, setMortgageType] = useState('repayment');
  const [result, setResult] = useState(null);

  function formatNumberWithCommas(value) {
    if (!value) return "";
    const numericValue = value.replace(/\D/g, '');

    return numericValue.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }

  const removeCommas = (value) => {
    return value.replace(/,/g, '');
  };

  const handleAmountChange = (e) => {
    const inputValue = e.target.value;
    const formatted = formatNumberWithCommas(inputValue);
    setAmount(formatted);
  };

  const calculateInterestOnly = (e) => {
    e.preventDefault();
    const theAmount = parseFloat(removeCommas(amount));
    const years = parseFloat(term);
    const annualRate = parseFloat(interestRate);
    const rate = annualRate / 12 / 100;
    const mortgageTerm = years * 12;

    if (mortgageType === 'repayment') {
      const M = theAmount * (rate * Math.pow(1 + rate, mortgageTerm)) / (Math.pow(1 + rate, mortgageTerm) - 1);
      const total = M * mortgageTerm;
      setResult({ monthly: M, total: total });
    } else if (mortgageType === 'interestOnly') {
      const M = theAmount * rate;
      const total = (M * mortgageTerm) + theAmount;
      setResult({ monthly: M, total: total });
    }
    
  }

  const clearAll = () => {
    setAmount('');
    setTerm('');
    setInterestRate('');
    setMortgageType('repayment');
    setResult(null);
  }

  return (
    <div className='flex min-h-screen items-center justify-center'>
      <div className="flex flex-col max-w-[375px] lg:max-w-[1440px] lg:items-stretch w-fit lg:flex-row bg-white lg:rounded-2xl">
        <main className="bg-white px-5 py-7 flex-1 lg:h-full lg:rounded-l-2xl lg:p-10">
          <div className='flex flex-col gap-1 items-start mb-5 lg:flex-row lg:items-center lg:justify-between'>
            <h1 className="text-2xl font-bold text-slate-900 lg:text-3xl">Mortgage Calculator</h1>
            <button className='text-slate-500 underline underline-offset-3 font-semibold hover:text-[hsl(61,70%,52%)] cursor-pointer' onClick={() => clearAll()}>Clear all</button>
          </div>
          
          <form className="flex flex-col gap-5">
            <div className='flex flex-col gap-2'>
              <label htmlFor='amount' className='text-slate-500 font-semibold'>Mortgage amount</label>
              <div className='relative'>
                <input type="text" name="amount" value={amount} className='peer no-spinners w-full border border-slate-400 hover:border-[hsl(61,70%,52%)] rounded-md pl-12 py-2 text-slate-900 font-semibold cursor-pointer'
                      onChange={handleAmountChange} required/>
                <span className='absolute inset-y-0 left-0 flex items-center px-3 text-slate-700 font-bold bg-slate-200 rounded-l-md pointer-events-none border border-slate-400 border-r-0 peer-hover:bg-[hsl(61,70%,52%)] peer-hover:border-[hsl(61,70%,52%)]'>&pound;</span>
              </div>
            </div>
            

            <div className='flex flex-col gap-2'>
              <label htmlFor='term' className='text-slate-500 font-semibold'>Mortgage term</label>
              <div className='relative'>
                <input type="number" name="term" value={term} className='peer no-spinners w-full border border-slate-400 hover:border-[hsl(61,70%,52%)] rounded-md pl-4 py-2 text-slate-900 font-semibold cursor-pointer'
                      onChange={(e) => setTerm(e.target.value)} required/>
                <span className='absolute inset-y-0 right-0 flex items-center px-3 text-slate-700 font-bold bg-slate-200 rounded-r-md pointer-events-none border border-slate-400 border-l-0 peer-hover:bg-[hsl(61,70%,52%)] peer-hover:border-[hsl(61,70%,52%)]'>years</span>
              </div>
            </div>

            <div className='flex flex-col gap-2'>
              <label htmlFor='term' className='text-slate-500 font-semibold'>Interest Rate</label>
              <div className='relative'>
                <input type="number" name="interest" value={interestRate} className='peer no-spinners w-full border border-slate-400 hover:border-[hsl(61,70%,52%)] rounded-md pl-4 py-2 text-slate-900 font-semibold cursor-pointer'
                      onChange={(e) => setInterestRate(e.target.value)} required/>
                <span className='absolute inset-y-0 right-0 flex items-center px-3 text-slate-700 font-bold bg-slate-200 rounded-r-md pointer-events-none border border-slate-400 border-l-0 peer-hover:bg-[hsl(61,70%,52%)] peer-hover:border-[hsl(61,70%,52%)]'>%</span>
              </div>
            </div>

            <fieldset>
              <legend className='text-slate-500 font-semibold mb-2'>Mortgage Type</legend>
              <div className='inline-flex items-center relative w-full border border-slate-400 rounded-sm gap-2 pl-2 py-2 text-slate-900 font-semibold mb-2 hover:border-[hsl(61,70%,52%)] has-checked:border-[hsl(61,70%,52%)]'>
                <label className="relative flex items-center cursor-pointer" htmlFor='repayment'>
                  <input name="type" type="radio" value='repayment' className={`peer h-5 w-5 cursor-pointer appearance-none rounded-full border checked:border-[hsl(61,70%,52%)] border-[hsl(61,70%,52%)] transition-all`} id='repayment'
                        onChange={(e) => setMortgageType(e.target.value)} checked={mortgageType === "repayment"}/>
                  <span className="absolute bg-[hsl(61,70%,52%)] w-3 h-3 rounded-full opacity-0 peer-checked:opacity-100 transition-opacity duration-200 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  </span>
                </label>
                <label className="ml-1 cursor-pointer" htmlFor='repayment'>Repayment</label>
              </div>

              <div className='inline-flex items-center relative w-full border border-slate-400 rounded-sm gap-2 pl-2 py-2 text-slate-900 font-semibold mb-2 hover:border-[hsl(61,70%,52%)] has-checked:border-[hsl(61,70%,52%)]'>
                <label className='relative flex items-center cursor-pointer'>
                  <input type="radio" name='type' value='interestOnly' className='peer h-5 w-5 cursor-pointer appearance-none rounded-full border border-[hsl(61,70%,52%)] checked:border-[hsl(61,70%,52%)] transition-all' id='interestOnly'
                        onChange={(e) => setMortgageType(e.target.value)} checked={mortgageType === "interestOnly"}/>
                  <span className='absolute bg-[hsl(61,70%,52%)] w-3 h-3 rounded-full opacity-0 peer-checked:opacity-100 transition-opacity duration-200 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
                  </span>
                </label>
                <label htmlFor="interestOnly" className='ml-1 cursor-pointer'>Interest Only</label>
              </div>
            </fieldset>

            <button type="submit" className='bg-[hsl(61,70%,52%)] flex items-center justify-center gap-2 w-full m-auto px-7 py-3 font-semibold text-slate-900 rounded-full'
                    onClick={calculateInterestOnly}>
              <img src={calculatorIcon} alt="calculator" />
              Calculate Repayments
            </button>
          </form>
        </main>

        {result ? (
          <section className='flex flex-col bg-cyan-950 w-full px-4 py-5 gap-4 pb-10 lg:flex-1 lg:rounded-r-2xl lg:rounded-bl-[5rem] lg:pt-10 lg:px-10'>
            <h2 className='text-2xl lg:text-3xl text-white font-bold'>Your results</h2>
            <p className='text-slate-300 lg:text-xl lg:mb-5'>Your results are shown below based on the information you provided. 
                To adjust the results, edit the form and click “calculate repayments” again.
            </p>

            <div className='bg-black/40 border-t-4 border-t-[hsl(61,70%,52%)] rounded-md p-3 lg:px-10 lg:py-7'>
              <div className='flex flex-col gap-2 mb-2'>
                <h3 className='text-slate-400 font-semibold lg:mb-2'>Your monthly repayments</h3>
                <span className='font-bold text-[hsl(61,70%,52%)] text-4xl lg:text-5xl mb-2 lg:mb-7'>&pound; {result?.monthly.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
              </div>
              <hr className='mb-4 border border-slate-700 lg:mb-7'/>

              <div className='flex flex-col gap-2 mb-2'>
                <h3 className='text-slate-400 font-semibold'>Total you will pay over the term</h3>
                <span className='font-bold text-white text-xl'>&pound; {result?.total.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
              </div>
            </div>
          </section>
        ) : (
          <section className='flex flex-col bg-cyan-950 w-full px-4 py-8 gap-4 pb-10 lg:flex-1 lg:rounded-r-2xl lg:rounded-bl-[5rem] lg:px-10 justify-center'>
            <div className='flex flex-col justify-center items-center text-center'>
              <img src={illustration} alt="illustration" />
              <h2 className='text-2xl text-white font-bold mb-4'>Results shown here</h2>
              <p className='text-slate-300'>Complete the form and click “calculate repayments” to see what 
                  your monthly repayments would be.
              </p>
            </div>
          </section>
        )}

      </div>
    </div>
  )
}

export default App
