/**
 * Calculates attendance percentage for a single subject
 * @param {number} presentCount - Number of present sessions
 * @param {number} totalSessions - Total number of sessions
 * @returns {number} Percentage with 2 decimal places (0-100)
 */
export const calculateSubjectAttendancePercentage = (presentCount, totalSessions) => {
    if (typeof presentCount !== 'number' || typeof totalSessions !== 'number') {
        throw new Error('Both arguments must be numbers');
    }
    
    if (totalSessions <= 0) return 0;
    if (presentCount < 0) return 0;
    if (presentCount > totalSessions) return 100;

    const percentage = (presentCount / totalSessions) * 100;
    return parseFloat(percentage.toFixed(2)); // Convert back to number
};

/**
 * Groups attendance records by subject and calculates summary statistics
 * @param {Array} subjectAttendance - Array of attendance records
 * @returns {Object} Grouped attendance data by subject
 */
export const groupAttendanceBySubject = (subjectAttendance = []) => {
    if (!Array.isArray(subjectAttendance)) {
        throw new Error('Input must be an array');
    }

    return subjectAttendance.reduce((acc, attendance) => {
        const { subName, status, date } = attendance;
        
        if (!subName || !subName._id) {
            console.warn('Attendance record missing subject information', attendance);
            return acc;
        }

        const subjectKey = `${subName.subName}_${subName._id}`;
        const sessions = parseInt(subName.sessions) || 0;

        if (!acc[subjectKey]) {
            acc[subjectKey] = {
                subjectName: subName.subName,
                subjectCode: subName.subCode,
                present: 0,
                absent: 0,
                sessions,
                allData: [],
                subId: subName._id,
                percentage: 0
            };
        }

        if (status === "Present") {
            acc[subjectKey].present++;
        } else if (status === "Absent") {
            acc[subjectKey].absent++;
        }

        acc[subjectKey].allData.push({ date, status });
        
        // Update percentage whenever data changes
        acc[subjectKey].percentage = calculateSubjectAttendancePercentage(
            acc[subjectKey].present,
            sessions
        );

        return acc;
    }, {});
};

/**
 * Calculates overall attendance percentage across all subjects
 * @param {Array} subjectAttendance - Array of attendance records
 * @returns {number} Overall attendance percentage (0-100)
 */
export const calculateOverallAttendancePercentage = (subjectAttendance = []) => {
    if (!Array.isArray(subjectAttendance)) {
        throw new Error('Input must be an array');
    }

    const subjectMap = new Map();
    let presentCount = 0;
    let totalRecords = 0;

    subjectAttendance.forEach(attendance => {
        const { subName, status } = attendance;
        
        if (!subName || !subName._id) {
            console.warn('Invalid attendance record', attendance);
            return;
        }

        if (!subjectMap.has(subName._id)) {
            subjectMap.set(subName._id, {
                sessions: parseInt(subName.sessions) || 0,
                count: 0
            });
        }

        if (status === "Present") {
            presentCount++;
        }
        totalRecords++;
    });

    if (totalRecords === 0) return 0;

    // Calculate weighted average based on sessions per subject
    let totalPossibleSessions = 0;
    let totalPresentSessions = 0;

    subjectMap.forEach((value, key) => {
        const subjectAttendance = subjectAttendance
            .filter(a => a.subName._id === key)
            .filter(a => a.status === "Present").length;
            
        const attendanceRatio = subjectAttendance / value.count || 0;
        totalPresentSessions += attendanceRatio * value.sessions;
        totalPossibleSessions += value.sessions;
    });

    if (totalPossibleSessions === 0) return 0;

    const overallPercentage = (totalPresentSessions / totalPossibleSessions) * 100;
    return parseFloat(overallPercentage.toFixed(2));
};

// Additional utility function
export const getAttendanceStatus = (percentage) => {
    if (percentage >= 90) return 'Excellent';
    if (percentage >= 75) return 'Good';
    if (percentage >= 60) return 'Average';
    return 'Needs Improvement';
};