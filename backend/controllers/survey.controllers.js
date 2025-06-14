import Survey from '../models/Survey.models.js';

// Handle survey submission
export const submitSurvey = async (req, res) => {
  try {
    const survey = new Survey(req.body);
    await survey.save();
    res.status(201).json({ message: 'Survey submitted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to submit survey', error: err.message });
  }
};

// (Optional) Get all surveys (for admin)
export const getAllSurveys = async (req, res) => {
  try {
    const surveys = await Survey.find();
    res.status(200).json(surveys);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch surveys', error: err.message });
  }
};