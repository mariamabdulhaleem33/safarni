import React, { useState } from 'react';
import { ToggleRow, ActionCard } from './ui';

export const AccountSecurity: React.FC = () => {
    const [biometricEnabled, setBiometricEnabled] = useState(false);
    const [faceIdEnabled, setFaceIdEnabled] = useState(false);

    return (
        <div className="relative rounded-xl sm:rounded-2xl p-px bg-gradient-to-b from-[#4A90E2] to-[#DE3163]">
            <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6">
                {/* Toggles */}
                <div className="mb-6">
                    <h3 className="text-sm font-medium text-gray-500 mb-3">Authentication</h3>
                    <div className="bg-gray-50 rounded-xl p-3">
                        <ToggleRow
                            label="Biometric ID"
                            isEnabled={biometricEnabled}
                            onToggle={() => setBiometricEnabled(!biometricEnabled)}
                        />
                        <div className="border-t border-gray-100 my-1" />
                        <ToggleRow
                            label="Face ID"
                            isEnabled={faceIdEnabled}
                            onToggle={() => setFaceIdEnabled(!faceIdEnabled)}
                        />
                    </div>
                </div>

                {/* Actions */}
                <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-3">Account Actions</h3>
                    <div className="space-y-2">
                        <ActionCard
                            title="Change Password"
                            description="Update your password"
                        />
                        <ActionCard
                            title="Device Management"
                            description="Manage connected devices"
                        />
                        <ActionCard
                            title="Deactivate Account"
                            description="Temporarily disable your account"
                        />
                        <ActionCard
                            title="Delete Account"
                            description="Permanently delete your account"
                            isDestructive
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};