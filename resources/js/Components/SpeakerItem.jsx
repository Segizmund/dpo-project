export default function SpeakerItem({ item, selected, toggle }) {
    const isActive = selected?.includes(item.id);

    return (
        <label className='flex items-center gap-3 cursor-pointer group'>
            <input 
                type="checkbox"
                checked={isActive}
                onChange={() => toggle(item.id)}
                className='w-4 h-4 rounded border-[#7C7C7C] text-[#A621F3] focus:ring-[#A621F3] cursor-pointer transition-colors'
            />
            <span className={`text-lg transition-all duration-300 ${
                isActive 
                    ? 'font-bold text-black' 
                    : 'text-gray-600 group-hover:text-black'
            }`}>
                {item.name}
            </span>
        </label>
    );
}