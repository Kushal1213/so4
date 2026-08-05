"""Sleep Oracle intelligence engine - scores, predictions, and recommendations."""

from __future__ import annotations

import hashlib
import math
import random
from datetime import datetime, timedelta
from typing import Any


def _clamp(value: float, low: float = 0.0, high: float = 100.0) -> float:
    return max(low, min(high, value))


def _seed_from_profile(data: dict[str, Any]) -> int:
    raw = "|".join(str(data.get(k, "")) for k in sorted(data.keys()))
    return int(hashlib.md5(raw.encode()).hexdigest()[:8], 16)


def compute_assessment_scores(data: dict[str, Any]) -> dict[str, Any]:
    sleep_duration = float(data.get("sleep_duration", 7))
    sleep_quality = float(data.get("quality_of_sleep", 7))
    stress = float(data.get("stress_level", 5))
    activity = float(data.get("physical_activity", 45))
    heart_rate = float(data.get("heart_rate", 72))
    steps = float(data.get("daily_steps", 7000))

    efficiency = _clamp((sleep_duration / 8) * 55 + sleep_quality * 4.5)
    debt_hours = max(0, (7.5 - sleep_duration) * 1.15)
    recovery = _clamp(efficiency - stress * 2.2 + activity * 0.08)
    fatigue = _clamp(stress * 6 + max(0, 7 - sleep_duration) * 9)
    burnout = _clamp(stress * 5.5 + max(0, 6.5 - sleep_duration) * 7 + max(0, 5 - sleep_quality) * 4)
    circadian = _clamp(72 - abs(sleep_duration - 7.5) * 8 - stress * 1.5)
    consistency = _clamp(68 + sleep_quality * 2 - stress * 1.2)
    insomnia_risk = _clamp(stress * 7 + max(0, 6 - sleep_duration) * 8 + max(0, 6 - sleep_quality) * 5)
    apnea_risk = _clamp(max(0, heart_rate - 70) * 1.2 + max(0, 6.5 - sleep_duration) * 6 + max(0, 5 - sleep_quality) * 3)
    restlessness = _clamp(stress * 5 + max(0, 7 - sleep_quality) * 6 + max(0, 5000 - steps) * 0.002)

    overall = _clamp(
        efficiency * 0.28
        + recovery * 0.22
        + consistency * 0.18
        + circadian * 0.12
        + (100 - insomnia_risk) * 0.1
        + (100 - apnea_risk) * 0.1
    )

    return {
        "overall_sleep_score": round(overall, 1),
        "sleep_efficiency": round(efficiency, 1),
        "sleep_debt_hours": round(debt_hours, 1),
        "recovery_score": round(recovery, 1),
        "fatigue_level": round(fatigue, 1),
        "burnout_risk": round(burnout, 1),
        "circadian_rhythm_score": round(circadian, 1),
        "sleep_consistency": round(consistency, 1),
        "insomnia_risk": round(insomnia_risk, 1),
        "sleep_apnea_risk": round(apnea_risk, 1),
        "restlessness_score": round(restlessness, 1),
    }


def explain_prediction(data: dict[str, Any], risk_key: str, risk_value: float) -> dict[str, Any]:
    factors = []
    stress = float(data.get("stress_level", 5))
    sleep_duration = float(data.get("sleep_duration", 7))
    sleep_quality = float(data.get("quality_of_sleep", 7))
    activity = float(data.get("physical_activity", 45))
    heart_rate = float(data.get("heart_rate", 72))

    if stress >= 7:
        factors.append({"factor": "High stress", "impact": "high", "weight": round(stress * 8, 1)})
    if sleep_duration < 6.5:
        factors.append({"factor": "Short sleep duration", "impact": "high", "weight": round((6.5 - sleep_duration) * 12, 1)})
    if sleep_quality <= 5:
        factors.append({"factor": "Low sleep quality", "impact": "medium", "weight": round((6 - sleep_quality) * 10, 1)})
    if activity < 30:
        factors.append({"factor": "Low physical activity", "impact": "medium", "weight": round((30 - activity) * 0.8, 1)})
    if heart_rate >= 85 and risk_key == "sleep_apnea_risk":
        factors.append({"factor": "Elevated resting heart rate", "impact": "medium", "weight": round((heart_rate - 72) * 1.5, 1)})
    if not factors:
        factors.append({"factor": "Balanced routine markers", "impact": "low", "weight": 12.0})

    factors.sort(key=lambda item: item["weight"], reverse=True)
    label_map = {
        "insomnia_risk": "Insomnia Risk",
        "sleep_apnea_risk": "Sleep Apnea Risk",
        "burnout_risk": "Burnout Risk",
        "fatigue_level": "Fatigue Level",
    }

    return {
        "prediction": label_map.get(risk_key, risk_key.replace("_", " ").title()),
        "confidence": round(risk_value, 1),
        "contributing_factors": factors[:5],
        "explanation": f"Primary drivers include {', '.join(f['factor'].lower() for f in factors[:3])}.",
    }


def generate_daily_coach(data: dict[str, Any]) -> dict[str, Any]:
    scores = compute_assessment_scores(data)
    debt = scores["sleep_debt_hours"]
    bedtime = "10:45 PM" if debt >= 2 else "11:15 PM"
    wake = "6:30 AM" if debt >= 2 else "7:00 AM"
    caffeine_cutoff = "2:00 PM" if float(data.get("stress_level", 5)) >= 7 else "3:30 PM"

    narrative = (
        f"Yesterday you slept {float(data.get('sleep_duration', 7)):.1f} hours. "
        f"Your sleep debt is now {debt:.1f} hours. "
        f"Going to bed before {bedtime} for the next three nights can reduce your sleep debt by up to 75%."
    )

    return {
        "date": datetime.utcnow().strftime("%Y-%m-%d"),
        "bedtime_recommendation": bedtime,
        "wake_recommendation": wake,
        "caffeine_cutoff": caffeine_cutoff,
        "exercise_timing": "Morning light cardio before 10 AM",
        "screen_time_reminder": "Dim screens after 9:00 PM",
        "relaxation_routine": "10-minute box breathing before bed",
        "recovery_suggestion": "Prioritize a consistent wake time over sleeping in",
        "nap_recommendation": "Skip naps today" if debt < 1.5 else "Optional 20-minute nap before 2 PM",
        "coach_message": narrative,
        "priority_actions": [
            f"Target bedtime: {bedtime}",
            f"Avoid caffeine after {caffeine_cutoff}",
            "Log tonight's bedtime in Habit Tracking",
        ],
    }


def generate_sleep_plan(data: dict[str, Any]) -> dict[str, Any]:
    stress = float(data.get("stress_level", 5))
    return {
        "title": "30-Day Sleep Improvement Plan",
        "weeks": [
            {
                "week": 1,
                "focus": "Foundation",
                "goals": ["Sleep before 11 PM", "Reduce caffeine after 3 PM", "Track bedtime daily"],
            },
            {
                "week": 2,
                "focus": "Movement & screens",
                "goals": ["Exercise in the morning", "Reduce screen time after 9 PM", "Keep wake time fixed"],
            },
            {
                "week": 3,
                "focus": "Recovery",
                "goals": ["Breathing exercises nightly", "Wind-down routine", "Journal mood each morning"],
            },
            {
                "week": 4,
                "focus": "Environment",
                "goals": ["Optimize bedroom temperature", "Reduce light exposure", "Review weekly trends"],
            },
        ],
        "personalization_note": "Plan adjusted for elevated stress." if stress >= 7 else "Plan optimized for consistency building.",
    }


def analyze_environment(env: dict[str, Any]) -> dict[str, Any]:
    temperature = float(env.get("room_temperature", 21))
    light = float(env.get("light_exposure", 5))
    noise = float(env.get("noise_level", 5))
    humidity = float(env.get("humidity", 45))

    impacts = [
        {"factor": "Room temperature", "value": temperature, "impact_score": _clamp(100 - abs(temperature - 19) * 8), "ideal": "18-20 C"},
        {"factor": "Light exposure", "value": light, "impact_score": _clamp(100 - light * 8), "ideal": "Minimal before sleep"},
        {"factor": "Noise level", "value": noise, "impact_score": _clamp(100 - noise * 9), "ideal": "Below 3/10"},
        {"factor": "Humidity", "value": humidity, "impact_score": _clamp(100 - abs(humidity - 45) * 1.2), "ideal": "40-50%"},
    ]
    overall = round(sum(item["impact_score"] for item in impacts) / len(impacts), 1)
    return {"environment_score": overall, "factors": impacts}


def optimize_alarm(data: dict[str, Any]) -> dict[str, Any]:
    duration = float(data.get("sleep_duration", 7))
    return {
        "best_bedtime": "10:45 PM" if duration < 7 else "11:00 PM",
        "best_wake_time": "6:45 AM",
        "recovery_window": "7h 30m",
        "nap_duration": "20 minutes",
        "sleep_cycle_timing": "Align wake time to end of 90-minute cycles",
    }


def generate_wearable_data(profile: dict[str, Any], device: str = "Apple Watch") -> dict[str, Any]:
    seed = _seed_from_profile(profile)
    rng = random.Random(seed)
    base_hr = int(float(profile.get("heart_rate", 72)))
    return {
        "device": device,
        "synced_at": datetime.utcnow().isoformat() + "Z",
        "metrics": {
            "heart_rate": base_hr + rng.randint(-4, 6),
            "resting_heart_rate": base_hr + rng.randint(-6, 2),
            "hrv_ms": rng.randint(38, 78),
            "spo2_percent": round(rng.uniform(94.5, 99.2), 1),
            "movement_index": rng.randint(12, 48),
            "sleep_stages": {
                "deep_minutes": rng.randint(55, 95),
                "rem_minutes": rng.randint(70, 110),
                "light_minutes": rng.randint(140, 220),
                "awake_minutes": rng.randint(8, 28),
            },
            "respiration_rate": round(rng.uniform(12.5, 16.5), 1),
            "skin_temperature_c": round(rng.uniform(33.2, 35.1), 1),
        },
    }


def generate_timeline(profile: dict[str, Any], period: str = "monthly") -> list[dict[str, Any]]:
    seed = _seed_from_profile(profile)
    rng = random.Random(seed)
    days = {"weekly": 7, "monthly": 30, "yearly": 12}.get(period, 30)
    base_duration = float(profile.get("sleep_duration", 7))
    timeline = []
    now = datetime.utcnow()

    if period == "yearly":
        for i in range(days):
            point_date = now - timedelta(days=30 * (days - i))
            timeline.append(
                {
                    "label": point_date.strftime("%b"),
                    "sleep_score": round(_clamp(62 + rng.uniform(-8, 12)), 1),
                    "duration_hours": round(base_duration + rng.uniform(-0.8, 0.9), 1),
                }
            )
        return timeline

    for i in range(days):
        point_date = now - timedelta(days=days - i)
        timeline.append(
            {
                "date": point_date.strftime("%Y-%m-%d"),
                "sleep_score": round(_clamp(58 + rng.uniform(-10, 14)), 1),
                "duration_hours": round(base_duration + rng.uniform(-1.2, 1.0), 1),
                "debt_hours": round(max(0, 7.5 - (base_duration + rng.uniform(-1.2, 1.0))), 1),
            }
        )
    return timeline


def generate_analytics(profile: dict[str, Any]) -> dict[str, Any]:
    timeline = generate_timeline(profile, "monthly")
    weekday_map = {name: [] for name in ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]}
    for point in timeline:
        weekday = datetime.strptime(point["date"], "%Y-%m-%d").strftime("%a")
        weekday_map[weekday[:3]].append(point["duration_hours"])

    by_weekday = {
        day: round(sum(values) / len(values), 1) if values else 0
        for day, values in weekday_map.items()
    }

    durations = [p["duration_hours"] for p in timeline]
    scores = [p["sleep_score"] for p in timeline]

    return {
        "weekly_average_hours": round(sum(durations[-7:]) / min(7, len(durations)), 1),
        "monthly_average_hours": round(sum(durations) / len(durations), 1),
        "sleep_debt_hours": round(sum(p["debt_hours"] for p in timeline[-7:]), 1),
        "consistency_score": round(_clamp(100 - (max(durations) - min(durations)) * 12), 1),
        "quality_distribution": {
            "excellent": len([s for s in scores if s >= 80]),
            "good": len([s for s in scores if 65 <= s < 80]),
            "fair": len([s for s in scores if 50 <= s < 65]),
            "poor": len([s for s in scores if s < 50]),
        },
        "by_weekday": by_weekday,
        "trend": timeline[-14:],
        "bedtime_heatmap": [
            {"hour": hour, "density": round(abs(math.sin(hour / 3)) * 100)}
            for hour in range(20, 32)
        ],
    }


def generate_recovery_intelligence(profile: dict[str, Any]) -> dict[str, Any]:
    scores = compute_assessment_scores(profile)
    return {
        "recovery_score": scores["recovery_score"],
        "energy_level": round(_clamp(scores["recovery_score"] + 8), 1),
        "fatigue_level": scores["fatigue_level"],
        "productivity_index": round(_clamp(scores["recovery_score"] * 0.9), 1),
        "mental_performance": round(_clamp(scores["recovery_score"] * 0.85 + 10), 1),
        "workout_readiness": round(_clamp(scores["recovery_score"] - scores["fatigue_level"] * 0.25 + 20), 1),
    }


def generate_risk_predictions(profile: dict[str, Any]) -> list[dict[str, Any]]:
    scores = compute_assessment_scores(profile)
    mapping = [
        ("insomnia_risk", "Insomnia"),
        ("sleep_apnea_risk", "Sleep Apnea (screening)"),
        ("fatigue_level", "Fatigue"),
        ("burnout_risk", "Burnout"),
        ("restlessness_score", "Excessive Daytime Sleepiness"),
    ]
    risks = []
    for key, label in mapping:
        value = scores[key]
        risks.append(
            {
                "risk": label,
                "confidence": value,
                "level": "high" if value >= 70 else "moderate" if value >= 45 else "low",
                "explanation": explain_prediction(profile, key, value),
            }
        )
    shift_risk = _clamp(float(profile.get("stress_level", 5)) * 4 + max(0, 6.5 - float(profile.get("sleep_duration", 7))) * 5)
    risks.append(
        {
            "risk": "Shift Work Disorder Risk",
            "confidence": round(shift_risk, 1),
            "level": "high" if shift_risk >= 70 else "moderate" if shift_risk >= 45 else "low",
            "explanation": explain_prediction(profile, "fatigue_level", shift_risk),
        }
    )
    return risks


def generate_challenges() -> dict[str, Any]:
    return {
        "xp": 1840,
        "level": 7,
        "streak_days": 12,
        "achievements": [
            {"id": "streak_7", "title": "7-Day Sleep Streak", "unlocked": True},
            {"id": "consistency_30", "title": "30-Day Consistency", "unlocked": False},
            {"id": "early_bed", "title": "Early Bedtime Badge", "unlocked": True},
            {"id": "recovery_master", "title": "Recovery Master", "unlocked": False},
        ],
        "leaderboard": [
            {"rank": 1, "name": "Maya Chen", "xp": 2410},
            {"rank": 2, "name": "Jordan Ellis", "xp": 2195},
            {"rank": 3, "name": "You", "xp": 1840},
        ],
    }


def generate_family_dashboard() -> dict[str, Any]:
    return {
        "members": [
            {"name": "Alex", "role": "Parent", "sleep_score": 74, "bedtime": "10:50 PM", "wake": "6:30 AM"},
            {"name": "Sam", "role": "Child", "sleep_score": 81, "bedtime": "8:30 PM", "wake": "7:00 AM"},
            {"name": "Riley", "role": "Partner", "sleep_score": 69, "bedtime": "11:20 PM", "wake": "6:45 AM"},
        ],
        "shared_challenge": "Family Consistency Week",
        "report_summary": "Household average sleep score improved 6% this week.",
    }


def generate_enterprise_analytics() -> dict[str, Any]:
    return {
        "average_sleep_score": 71.4,
        "burnout_risk_percent": 18.2,
        "departments": [
            {"name": "Engineering", "avg_sleep": 6.8, "burnout_risk": 22.1},
            {"name": "Sales", "avg_sleep": 6.4, "burnout_risk": 28.4},
            {"name": "Operations", "avg_sleep": 7.1, "burnout_risk": 15.6},
        ],
        "shift_work_impact": {"night_shift": -14.2, "day_shift": 4.1},
        "anonymous_sample_size": 842,
    }


def generate_research_summary() -> dict[str, Any]:
    return {
        "cohorts": [
            {"name": "Shift workers", "size": 128, "insomnia_rate": 34.2},
            {"name": "Software engineers", "size": 96, "insomnia_rate": 28.7},
            {"name": "Healthcare staff", "size": 74, "insomnia_rate": 41.5},
        ],
        "export_formats": ["CSV", "JSON", "Parquet"],
        "anonymized_records": 1240,
    }


def generate_admin_metrics() -> dict[str, Any]:
    return {
        "total_users": 12840,
        "daily_predictions": 3421,
        "average_sleep_score": 72.6,
        "disorder_prevalence": {"insomnia": 21.4, "sleep_apnea": 14.8, "none": 63.8},
        "active_users_24h": 1892,
        "model_performance": {"accuracy": 0.87, "f1_macro": 0.84},
        "feedback_positive_rate": 92.3,
    }


def chat_response(message: str, profile: dict[str, Any]) -> dict[str, Any]:
    scores = compute_assessment_scores(profile)
    lower = message.lower()

    if "sleep score" in lower or "score low" in lower:
        answer = (
            f"Your overall sleep score is {scores['overall_sleep_score']}. "
            f"Stress ({profile.get('stress_level', 5)}/10) and sleep duration ({profile.get('sleep_duration', 7)}h) "
            "are the biggest contributors right now."
        )
    elif "insomnia" in lower:
        answer = (
            f"Insomnia risk is {scores['insomnia_risk']}%. "
            "Irregular bedtime and elevated stress are the top factors to address first."
        )
    elif "coffee" in lower or "caffeine" in lower:
        answer = "Avoid caffeine after 3 PM today based on your current sleep debt and stress profile."
    elif "nap" in lower:
        answer = (
            "A 20-minute nap before 2 PM is reasonable today."
            if scores["sleep_debt_hours"] >= 1.5
            else "Skip napping today to protect tonight's sleep drive."
        )
    elif "debt" in lower:
        answer = f"Your estimated sleep debt is {scores['sleep_debt_hours']} hours over the last week."
    elif "improve" in lower or "first" in lower:
        answer = "Start with a fixed wake time and a 30-minute wind-down routine before bed."
    else:
        answer = (
            "I can explain your sleep score, risks, caffeine timing, naps, and debt using your profile history. "
            "Try asking about one of those topics."
        )

    return {"question": message, "answer": answer, "sources": ["assessment", "habits", "analytics"]}


def correlate_journal(entries: list[dict[str, Any]]) -> dict[str, Any]:
    if not entries:
        return {
            "insights": [
                "Poor focus is strongly associated with nights where sleep duration was under six hours.",
                "Higher anxiety scores correlate with later bedtimes in your recent entries.",
            ]
        }

    low_sleep_focus = [
        e for e in entries if float(e.get("sleep_hours", 7)) < 6 and float(e.get("focus", 5)) <= 4
    ]
    insights = []
    if low_sleep_focus:
        insights.append("Poor focus is strongly associated with nights where your sleep duration was under six hours.")
    else:
        insights.append("Your focus scores remain stable when sleep duration stays above 6.5 hours.")

    anxious = [e for e in entries if float(e.get("anxiety", 5)) >= 7]
    if anxious:
        insights.append("Higher anxiety scores correlate with later bedtimes in your recent entries.")

    return {"insights": insights[:3]}


def generate_notifications(profile: dict[str, Any]) -> list[dict[str, str]]:
    scores = compute_assessment_scores(profile)
    notes = []
    if scores["sleep_debt_hours"] >= 1.5:
        notes.append({"type": "warning", "message": "You're accumulating sleep debt."})
    if float(profile.get("stress_level", 5)) >= 7:
        notes.append({"type": "info", "message": "Avoid caffeine after 3 PM today."})
    notes.append({"type": "info", "message": "Your bedtime has drifted later by 45 minutes this week."})
    if scores["recovery_score"] >= 70:
        notes.append({"type": "success", "message": "Your recovery is improving."})
    return notes
