package gameroom.mission;

import gameroom.data.MissionResult;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

public class MissionManager {
    private final Map<String, MissionResult> missionMap = new ConcurrentHashMap<>();

    public boolean joinMission(String missionId) {
        MissionResult result = missionMap.computeIfAbsent(missionId, k -> new MissionResult());
        synchronized (result) {
            result.setTotalCount(result.getTotalCount() + 1);
        }
        return true;
    }

    public boolean updateMission(String missionId, boolean go) {
        if (!missionMap.containsKey(missionId)) return false;
        MissionResult result = missionMap.get(missionId);
        synchronized (result) {
            if (result.getGoCount() + result.getNoGoCount() < result.getTotalCount()) {
                if (go) {
                    result.setGoCount(result.getGoCount() + 1);
                } else {
                    result.setNoGoCount(result.getNoGoCount() + 1);
                }
            } else {
                return false;
            }
        }
        return true;
    }

    public MissionResult getResult(String missionId) {
        return missionMap.get(missionId);
    }
}
