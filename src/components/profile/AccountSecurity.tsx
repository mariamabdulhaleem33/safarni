import React, { useState } from 'react';
import { ToggleRow, ActionCard } from './ui';

export const AccountSecurity: React.FC = () => {
    const [biometricEnabled, setBiometricEnabled] = useState(false);
    const [faceIdEnabled, setFaceIdEnabled] = useState(false);

    return (
        <div className="relative rounded-2xl p-px bg-gradient-to-b from-[#4A90E2] to-[#DE3163]">
            <div className="bg-white rounded-2xl p-6 md:p-10">
                <h1 className="text-2xl md:text-3xl font-semibold text-center text-gray-800 mb-10">
                    Account & Security
                </h1>

                <div className="flex flex-col gap-6">
                    <div className="flex flex-col gap-2 mb-4">
                        <ToggleRow
                            label="Biometric ID"
                            isEnabled={biometricEnabled}
                            onToggle={() => setBiometricEnabled(!biometricEnabled)}
                        />
                        <ToggleRow
                            label="Face ID"
                            isEnabled={faceIdEnabled}
                            onToggle={() => setFaceIdEnabled(!faceIdEnabled)}
                        />
                    </div>

                    <div className="flex flex-col gap-4">
                        <ActionCard
                            title="Change Password"
                            description="Update your password for better security."
                        />
                        <ActionCard
                            title="Device Management"
                            description="Manage your account on the various devices you own."
                        />
                        <ActionCard
                            title="Deactivate Account"
                            description="Temporarily deactivate your account. Easily reactivate when you're ready."
                        />
                        <ActionCard
                            title="Delete Account"
                            description="Permanently remove your account and data. Proceed with caution."
                            isDestructive
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};