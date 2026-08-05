import {
  ArrowClockwise,
  ArrowRight,
  ChartBar,
  CheckCircle,
  Info,
  WarningCircle,
} from '@phosphor-icons/react'

const getResultInfo = (result) => {
  const predictionText = typeof result === 'object' ? result.prediction : result
  const normalised = (predictionText || '').toLowerCase()

  if (normalised === 'no disorder' || normalised === 'none') {
    return {
      eyebrow: 'Screening result',
      title: 'No clear sleep-disorder pattern was found.',
      description: 'Based on the information you shared, the model did not identify a strong pattern associated with insomnia or sleep apnea.',
      nextStep: 'Keep noticing how rested you feel. If sleep concerns persist, a clinician can help you look beyond this screening result.',
      Icon: CheckCircle,
    }
  }

  if (normalised.includes('apnea')) {
    return {
      eyebrow: 'Screening result',
      title: 'Your inputs include a pattern worth discussing.',
      description: 'The model found a pattern associated with sleep apnea in its training data. It cannot confirm whether you have a sleep disorder.',
      nextStep: 'Consider speaking with a qualified healthcare professional, especially if you notice loud snoring, breathing pauses, or daytime sleepiness.',
      Icon: WarningCircle,
    }
  }

  if (normalised.includes('insomnia')) {
    return {
      eyebrow: 'Screening result',
      title: 'Your inputs include a pattern worth discussing.',
      description: 'The model found a pattern associated with insomnia in its training data. It cannot confirm whether you have a sleep disorder.',
      nextStep: 'A clinician can help if difficulty falling asleep, staying asleep, or feeling rested is affecting your day-to-day life.',
      Icon: WarningCircle,
    }
  }

  return {
    eyebrow: 'Screening result',
    title: 'Your sleep pattern has been reviewed.',
    description: `The model returned: ${predictionText || 'an unavailable result'}.`,
    nextStep: 'If something about your sleep does not feel right, a healthcare professional can give you a fuller assessment.',
    Icon: Info,
  }
}

const formatLabel = (label) => {
  if (label.toLowerCase() === 'none') return 'No disorder pattern'
  return label
}

function PredictionResult({ prediction, onStartOver }) {
  const resultInfo = getResultInfo(prediction)
  const probabilities = prediction?.probabilities || {}
  const { Icon } = resultInfo

  return (
    <section className="result-panel" aria-labelledby="result-title">
      <div className="result-summary">
        <div className="result-icon"><Icon size={28} weight="bold" aria-hidden="true" /></div>
        <div>
          <p className="eyebrow">{resultInfo.eyebrow}</p>
          <h2 id="result-title">{resultInfo.title}</h2>
          <p>{resultInfo.description}</p>
        </div>
      </div>

      <div className="result-details">
        {Object.keys(probabilities).length > 0 && (
          <section className="probability-panel" aria-labelledby="distribution-title">
            <div className="result-subhead">
              <ChartBar size={21} weight="bold" aria-hidden="true" />
              <div>
                <h3 id="distribution-title">How the model distributed this result</h3>
                <p>This is model confidence, not clinical certainty.</p>
              </div>
            </div>
            <div className="probability-list">
              {Object.entries(probabilities).map(([label, probability]) => {
                const percent = Math.round(Number(probability) * 100)
                return (
                  <div className="probability-row" key={label}>
                    <div className="probability-label"><span>{formatLabel(label)}</span><strong>{percent}%</strong></div>
                    <div className="probability-track" role="progressbar" aria-label={`${formatLabel(label)} probability`} aria-valuemin="0" aria-valuemax="100" aria-valuenow={percent}>
                      <div className="probability-fill" style={{ width: `${percent}%` }} />
                    </div>
                  </div>
                )
              })}
            </div>
          </section>
        )}

        <aside className="next-step" aria-labelledby="next-step-title">
          <Info size={21} weight="bold" aria-hidden="true" />
          <div>
            <h3 id="next-step-title">What to do with this</h3>
            <p>{resultInfo.nextStep}</p>
          </div>
        </aside>
      </div>

      <div className="result-footer">
        <p>This tool does not diagnose, treat, or replace care from a qualified healthcare professional.</p>
        <button className="button button-secondary" type="button" onClick={onStartOver}>
          <ArrowClockwise size={18} weight="bold" aria-hidden="true" />
          Adjust my answers
          <ArrowRight size={16} weight="bold" aria-hidden="true" />
        </button>
      </div>
    </section>
  )
}

export default PredictionResult
